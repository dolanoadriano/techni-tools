import { Editor } from "@monaco-editor/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { RequestData } from "../Request/types";
import "./style.scss";
import { Props } from "./types";

const RequestBodyRaw: React.FC<Props> = (props) => {
  const { selectedLanguage } = props;

  const { register } = useFormContext<RequestData>();

  return (
    <div className={`RequestBodyRaw`}>
      <div className="editor-wrapper">
        <Controller
          {...register("rawBody")}
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
        />
      </div>
    </div>
  );
};

export default RequestBodyRaw;
