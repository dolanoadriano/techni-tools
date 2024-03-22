import { Editor } from "@monaco-editor/react";
import React from "react";

import "./style.scss";
import { Props } from "./types";

const x: Record<
  string,
  { language?: string; format?: (data: string | undefined) => string }
> = {
  "application/json": {
    language: "json",
    format: (data) => JSON.stringify(data, null, 2),
  },
  "application/xml": { language: "xml" },
  "text/html": { language: "html" },
  "application/html": { language: "html" },
  "text/plain": { language: "plain" },
};

const ResponseBody: React.FC<Props> = (props) => {
  const { data, contentType } = props;

  const mimeType = contentType.split(";")[0];

  return (
    <div className="ResponseBody">
      <div>
        {mimeType?.includes("image") && <img src={data} alt="Response Image" />}
        {mimeType?.includes("video") && <video src={data} controls></video>}
        {mimeType?.includes("audio") && <audio src={data} controls></audio>}
      </div>

      <div className="editor-wrapper">
        {x[mimeType]?.language && (
          <Editor
            height="100%"
            theme="vs-dark"
            language={x[mimeType]?.language}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
            value={x[mimeType].format?.(data) ?? data}
          />
        )}
      </div>
    </div>
  );
};

export default ResponseBody;
