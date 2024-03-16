import Editor from "@monaco-editor/react";
import React from "react";

import "./style.scss";
import { ContentType, Props } from "./types";

const Content: React.FC<Props> = (props) => {
  const { contentType, content } = props;

  const commonEditorProps = {
    height: "100%",
    theme: "vs-dark",
    value: content,
    options: {
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
    },
  };

  const displays: Record<ContentType, JSX.Element> = {
    "text/plain": <div>{content}</div>,
    "text/html": <div dangerouslySetInnerHTML={{ __html: content }} />,
    "application/json": <Editor {...commonEditorProps} language="json" />,
    "application/javascript": <></>,
    "text/css": <style dangerouslySetInnerHTML={{ __html: content }}></style>,
    "text/xml": <pre>{content}</pre>,
    "application/xml": <pre>{content}</pre>,
    "application/x-www-form-urlencoded": <div>{content}</div>, // Trudno wyświetlić w inny sposób bez parsowania
    "multipart/form-data": <div>{content}</div>, // Zazwyczaj nie jest wyświetlany jako ciąg
    "image/png": <img src={content} alt="image/png" />,
    "image/jpeg": <img src={content} alt="image/jpeg" />,
    "image/gif": <img src={content} alt="image/gif" />,
    "video/mp4": <video src={content} controls />,
    "audio/mpeg": <audio src={content} controls />,
    "application/pdf": (
      <iframe src={content} style={{ width: "100%", height: "500px" }}></iframe>
    ),
    "application/zip": <div>{content}</div>, // Trudno wyświetlić bez pobrania
  };

  return <div className={`Content`}>{displays[contentType]}</div>;
};

export default Content;
