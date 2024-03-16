import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "./style.scss";
import { Props } from "./types";

const contentTypeMap = {
  none: undefined,
  "form-data": "multipart/form-data",
  "x-www-form-urlencoded": "application/x-www-form-urlencoded",
  raw: {
    text: "text/plain",
    javascript: "application/javascript",
    json: "application/json",
    html: "application/html",
    xml: "application/xml",
  },
};

const RequestBody: React.FC<Props> = (props) => {
  const {} = props;

  const { register, setValue } = useFormContext();
  const [selectedBodyType, setSelectedBodyType] =
    useState<keyof typeof contentTypeMap>("none");
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof (typeof contentTypeMap)["raw"]>("json");

  useEffect(() => {
    const contentType =
      selectedBodyType === "raw"
        ? contentTypeMap[selectedBodyType][selectedLanguage]
        : contentTypeMap[selectedBodyType];

    setValue("headers.Content-Type", contentType);
  }, [selectedBodyType, selectedLanguage]);

  return (
    <div className={`RequestBody`}>
      <header>
        <fieldset>
          {Object.entries(contentTypeMap).map(([bodyType]) => (
            <label key={bodyType}>
              <input
                type={"radio"}
                name={"body-type"}
                value={bodyType}
                checked={selectedBodyType === bodyType}
                onChange={() => setSelectedBodyType(bodyType as any)}
              />
              <span>{bodyType}</span>
            </label>
          ))}
        </fieldset>
        {selectedBodyType === "raw" && (
          <select
            className="language"
            value={selectedLanguage}
            onChange={({ target: { value } }) =>
              setSelectedLanguage(value as any)
            }
          >
            {Object.entries(contentTypeMap["raw"]).map(([language]) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        )}
      </header>
      {selectedBodyType === "raw" && (
        <div className="editor-wrapper">
          <Controller
            {...register("body")}
            render={({ field }) => (
              <Editor
                width="100%"
                height="100%"
                theme="vs-dark"
                language={selectedLanguage}
                options={{
                  readOnly: field.disabled,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          ></Controller>
        </div>
      )}
    </div>
  );
};

export default RequestBody;
