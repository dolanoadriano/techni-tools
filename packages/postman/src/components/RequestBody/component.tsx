import React from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../KeyValuePairs/types";
import { RequestData } from "../Request/types";
import RequestBodyFormData from "../RequestBodyFormData";
import RequestBodyFormUrlencoded from "../RequestBodyFormUrlencoded";
import RequestBodyRaw from "../RequestBodyRaw";
import "./style.scss";
import { Props } from "./types";

const uniqueBy =
  <TData extends object>(key: keyof TData) =>
  (value: TData, index: number, array: TData[]) =>
    index === array.findIndex((t) => t[key] === value[key]);

const z = [
  {
    contentType: null,
    bodyType: "none",
  },
  {
    contentType: "multipart/form-data",
    bodyType: "form-data",
  },
  {
    contentType: "application/x-www-form-urlencoded",
    bodyType: "x-www-form-urlencoded",
  },
  {
    contentType: "text/plain",
    bodyType: "raw",
    language: "plain",
    languageLabel: "Text",
  },
  {
    contentType: "application/javascript",
    bodyType: "raw",
    language: "javascript",
    languageLabel: "JavaScript",
  },
  {
    contentType: "application/json",
    bodyType: "raw",
    language: "json",
    languageLabel: "JSON",
  },
  {
    contentType: "application/xml",
    bodyType: "raw",
    language: "xml",
    languageLabel: "XML",
  },
  {
    contentType: "text/html",
    bodyType: "raw",
    language: "html",
    languageLabel: "HTML",
  },
];

const RequestBody: React.FC<Props> = (props) => {
  const {} = props;

  const { setValue, watch } = useFormContext<RequestData>();

  const headerEntries = watch("headerEntries");
  const rawBodyLanguage = watch("rawBodyLanguage");

  const contentType = headerEntries.find(
    ({ key }) => key === "Content-Type"
  )?.value;

  const { bodyType: selectedBodyType } = z.find(
    (zz) => zz.contentType === contentType
  ) || { bodyType: "none" };

  const setHeader = (key: string, value: string | null) => {
    const idx = headerEntries.findIndex((entry) => entry.key === key);
    const nextEntry: Entry = {
      id: uuidv4(),
      key,
      value: value ?? "",
      type: "text",
      checked: true,
      readonly: true,
    };
    const newEntries =
      value === null
        ? headerEntries.filter((entry) => entry.key !== key)
        : idx === -1
        ? [...headerEntries, { ...nextEntry }]
        : (headerEntries as any).with(idx, nextEntry);

    setValue("headerEntries", newEntries);
  };

  return (
    <div className={`RequestBody`}>
      <header>
        <div className="radio-tabs">
          <select
            value={selectedBodyType}
            onChange={(event) => {
              setHeader(
                "Content-Type",
                z.find((x) => x.bodyType === event.target.value)!.contentType
              );
            }}
          >
            {z.filter(uniqueBy("bodyType")).map(({ bodyType }) => (
              <option value={bodyType}>{bodyType}</option>
            ))}
          </select>
          <fieldset>
            {z.filter(uniqueBy("bodyType")).map(({ bodyType, contentType }) => (
              <label key={contentType}>
                <input
                  type={"radio"}
                  name={"body-type"}
                  value={bodyType}
                  checked={selectedBodyType === bodyType}
                  onChange={() => {
                    setHeader("Content-Type", contentType);
                  }}
                />
                <span>{bodyType}</span>
              </label>
            ))}
          </fieldset>
        </div>
        {selectedBodyType === "raw" && (
          <select
            className="language"
            value={rawBodyLanguage}
            onChange={({ target: { value: language } }) => {
              const newContentType =
                z.find((zz) => zz.language === language)?.contentType ?? null;
              setHeader("Content-Type", newContentType);
              setValue("rawBodyLanguage", language);
            }}
          >
            {z
              .filter(({ language }) => language)
              .map(({ language, languageLabel }) => (
                <option key={language} value={language}>
                  {languageLabel}
                </option>
              ))}
          </select>
        )}
      </header>
      <div>
        {selectedBodyType === "form-data" && <RequestBodyFormData />}
        {selectedBodyType === "x-www-form-urlencoded" && (
          <RequestBodyFormUrlencoded />
        )}
        {selectedBodyType === "raw" && (
          <RequestBodyRaw selectedLanguage={rawBodyLanguage} />
        )}
      </div>
    </div>
  );
};

export default RequestBody;
