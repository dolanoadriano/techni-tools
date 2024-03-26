import axios from "axios";
import qs from "qs";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Split from "react-split";

import Astronaut from "../../assets/astronaut.svg";
import HitSend from "../../assets/illustration-hit-send.svg";
import useOptimisticMutation from "../../hooks/useOptimisticMutation";
import postman from "../../modules/postman";
import { interpolatePathVariables } from "../../utils";
import EmptyResponse from "../EmptyResponse";
import { Entry } from "../KeyValuePairs/types";
import Pane from "../Pane";
import Request from "../Request";
import { RequestData } from "../Request/types";
import Response from "../Response";
import { PostmanResponse } from "../Response/types";
import "./style.scss";
import { Props } from "./types";

const createFormData = (entries: Entry<string | File>[]) => {
  const formData = new FormData();
  entries.forEach(({ key, value }) => formData.append(key, value));
  return formData;
};

const Requester: React.FC<Props> = (props) => {
  const { requester, onChange } = props;
  const {
    mutate: sendRequest,
    cancel,
    isPending,
    data: response,
    error,
  } = useOptimisticMutation<PostmanResponse, any, RequestData>({
    mutationKey: [],
    mutationFn: async (variables, { abortController }) => {
      const {
        url,
        method,
        headerEntries,
        formDataEntries,
        formUrlencodedEntries,
        pathVariableEntries,
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
        const response = await postman({
          url: interpolatePathVariables(
            url,
            pathVariableEntries.map(({ key, value }) => [key, value])
          ),
          method: method,
          headers,
          data: body,
          signal: abortController.signal,
          responseType: "arraybuffer",
        });
        return response;
      } catch (error) {
        console.log(error, "@");

        if (axios.isAxiosError(error) && error.response) return error?.response;
        throw error;
      }
    },
  });

  const form = useForm<RequestData>({
    defaultValues: requester.data,
  });
  const { getValues } = form;

  const requestData = getValues();

  useEffect(() => {
    onChange(requester.id, { ...requester, data: requestData });
  }, [JSON.stringify(requestData)]);

  return (
    <FormProvider {...form}>
      <Split
        style={{ height: "100%" }}
        gutterSize={11}
        direction="vertical"
        minSize={[92, 32]}
      >
        <Pane className="request-pane">
          <Request
            isPending={isPending}
            onSubmit={(data) => sendRequest(data)}
            onCancel={() => cancel()}
          />
        </Pane>
        <Pane className="response-pane" isPending={isPending}>
          {response && <Response response={response} />}
          {!response && !error && (
            <EmptyResponse
              illustrationSrc={HitSend}
              text={"Click Send to get a response"}
            />
          )}
          {!response && error && (
            <EmptyResponse
              illustrationSrc={Astronaut}
              text={"Could not send request"}
            />
          )}
        </Pane>
      </Split>
    </FormProvider>
  );
};

export default Requester;
