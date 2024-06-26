import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import { extractPathVariableKeys, merge } from "../../utils";
import Dot from "../Dot";
import { Entry } from "../KeyValuePairs/types";
import RequestBody from "../RequestBody";
import RequestHeaders from "../RequestHeaders";
import RequestParams from "../RequestParams";
import Tabs from "../Tabs";
import "./style.scss";
import { Props, RequestData } from "./types";

const Request: React.FC<Props> = (props) => {
  const { onSubmit, onCancel, isPending } = props;

  const form = useFormContext<RequestData>();
  const { register, handleSubmit, watch, setValue } = form;

  const method = watch("method");
  const paramEntries = watch("paramEntries");
  const headerEntries = watch("headerEntries");
  const rawBody = watch("rawBody");
  const formDataEntries = watch("formDataEntries");
  const formUrlencodedEntries = watch("formUrlencodedEntries");
  const pathVariableEntries = watch("pathVariableEntries");
  const selectedTab = watch("selectedTab") ?? "params";
  const url = watch("url");
  const [urlPath = "", queryString = ""] = url.split("?");
  const pathVariables = extractPathVariableKeys(urlPath);

  useEffect(() => {
    const newQueryString = paramEntries
      .filter(({ checked }) => checked)
      .map(({ key, value }) => `${key}=${value}`)
      .join("&");

    const newUrl = `${url.split("?")[0] || ""}${
      newQueryString ? `?${newQueryString}` : ""
    }`;
    queryString !== newQueryString && setValue("url", newUrl);
  }, [paramEntries]);

  useEffect(() => {
    const newPathVariableEntries: Entry[] = pathVariables.map((variable) => ({
      id: uuidv4(),
      type: "text",
      key: variable,
      value: "",
      checked: true,
    }));
    const mergedPathVariableEntries = merge(
      newPathVariableEntries,
      pathVariableEntries.filter((z) => pathVariables.includes(z.key)),
      (entry) => entry.key
    );
    setValue("pathVariableEntries", mergedPathVariableEntries);
  }, [JSON.stringify(pathVariables)]);

  useEffect(() => {
    // const queryString = url.split("?")[1] || "";
    // const queryParams = queryString ? queryString.split("&") : [];
    // const checkedParamEntries = paramEntries.filter(({ checked }) => checked);
    // const newParamEntries: Entry[] = [
    //   ...queryParams
    //     .map((param) => param.split("="))
    //     .map(([key = "", value = ""], index) => ({
    //       id: checkedParamEntries[index]?.id || uuidv4(),
    //       type: "text" as Entry["type"],
    //       key: decodeURIComponent(key),
    //       value: decodeURIComponent(value),
    //       checked: true,
    //     })),
    //   ...paramEntries.filter(({ checked }) => !checked),
    // ];
    //JSON.stringify(paramEntries) !== JSON.stringify(newParamEntries) &&
    //  setValue("paramEntries", newParamEntries);
  }, [queryString]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form
      className="Request"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <header>
        <div className="endpoint">
          <select
            className="method"
            {...register("method")}
            data-method={method}
          >
            {["get", "post", "put", "patch", "delete", "head", "options"].map(
              (method) => (
                <option key={method}>{method}</option>
              )
            )}
          </select>
          <div className="divider"></div>
          <input
            type="text"
            placeholder="Enter URL or paste text"
            {...register("url")}
          />
        </div>

        {!isPending && (
          <button className="fill" type="submit">
            <span>Send</span>
            <IoMdSend className="icon" />
          </button>
        )}
        {isPending && (
          <button className="fill gray" type="button" onClick={handleCancel}>
            <span>Cancel</span>
            <IoStop className="icon" />
          </button>
        )}
      </header>
      <div>
        <Tabs
          options={[
            { value: "params", dot: paramEntries.length > 0 },
            { value: "headers", count: headerEntries.length },
            {
              value: "body",
              dot:
                rawBody ||
                formDataEntries.length ||
                formUrlencodedEntries.length,
            },
          ]}
          value={selectedTab}
          onChange={({ value }) => setValue("selectedTab", value)}
          renderOption={({ value, dot, count }) => (
            <div className="tab-option">
              <span>{value}</span> {Boolean(dot) && <Dot />}{" "}
              {count !== undefined && count > 0 && (
                <span className="tab-count">({count})</span>
              )}
            </div>
          )}
        />
      </div>
      <div className="tab-content">
        {selectedTab === "params" && <RequestParams />}
        {selectedTab === "headers" && <RequestHeaders />}
        {selectedTab === "body" && <RequestBody />}
      </div>
    </form>
  );
};

export default Request;
