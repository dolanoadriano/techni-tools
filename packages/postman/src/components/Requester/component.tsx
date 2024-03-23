import axios from "axios";
import qs from "qs";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Split from "react-split";

import HitSend from "../../assets/illustration-hit-send.svg";
import useOptimisticMutation from "../../hooks/useOptimisticMutation";
import { Entry } from "../KeyValuePairs/types";
import Request from "../Request";
import { RequestData } from "../Request/types";
import Response from "../Response";
import { PostmanResponse } from "../Response/types";
import WithProgressBar from "../WithProgressBar";
import "./style.scss";
import { Props } from "./types";

const createFormData = (entries: Entry<string | File>[]) => {
  const formData = new FormData();
  entries.forEach(({ key, value }) => formData.append(key, value));
  return formData;
};

const Requester: React.FC<Props> = (props) => {
  const {} = props;
  const {
    mutate: sendRequest,
    cancel,
    isPending,
    data: response,
  } = useOptimisticMutation<PostmanResponse, any, RequestData>({
    mutationKey: [],
    mutationFn: async (variables, { abortController }) => {
      const {
        url,
        method,
        headerEntries,
        formDataEntries,
        formUrlencodedEntries,
        rawBody,
      } = variables;

      const contentType = headerEntries.find(
        ({ key }) => key === "Content-Type"
      )?.value;

      const formData = createFormData(formDataEntries);
      const body = !contentType
        ? undefined
        : contentType?.includes("form-data")
        ? formData
        : contentType?.includes("x-www-form-urlencoded")
        ? qs.stringify(
            formUrlencodedEntries.reduce<Record<string, string>>(
              (acc, { key, value }) => {
                acc[key] = value;
                return acc;
              },
              {}
            )
          )
        : rawBody;

      const headers = headerEntries
        .filter(({ checked }) => checked)
        .reduce<Record<string, string>>((headers, headerEntry) => {
          const { key, value } = headerEntry;
          headers[key] = value;
          return headers;
        }, {});

      try {
        const response = await axios({
          url: url,
          method: method,
          headers,
          data: body,
          signal: abortController.signal,
          responseType: "arraybuffer",
        });
        return response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === "Network Error") {
          return { status: "CORS", duration: 0, data: "", headers: {} };
        }
        if (axios.isAxiosError(error) && error.response) return error?.response;
        throw error;
      }
    },
  });

  const form = useForm<RequestData>({
    defaultValues: {
      method: "get",
      url: "",
      paramEntries: [],
      headerEntries: [],
      rawBody: undefined,
      rawBodyLanguage: "plain",
      formDataEntries: [],
      formUrlencodedEntries: [],
    },
  });

  return (
    <FormProvider {...form}>
      <Split
        style={{ height: "100%" }}
        gutterSize={11}
        direction="vertical"
        minSize={[80, 40]}
      >
        <Request
          isPending={isPending}
          onSubmit={(data) => sendRequest(data)}
          onCancel={() => cancel()}
        />
        <WithProgressBar className="response-pane" isPending={isPending}>
          {response && <Response response={response} />}
          {!response && (
            <div className="response-viewer-empty">
              <img src={HitSend} />
              <span>Click Send to get a response</span>
            </div>
          )}
        </WithProgressBar>
      </Split>
    </FormProvider>
  );
};

export default Requester;
