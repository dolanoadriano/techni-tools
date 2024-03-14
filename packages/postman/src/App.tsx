import Editor from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import "./App.scss";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init().then(/* ... */);

function App() {
  const cancelRequestRef = useRef<CancelTokenSource | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      method: "post",
      url: "https://api.timeqube.online/healthcheck",
      params: [],
      headers: [],
    },
  });

  const {
    mutate: sendRequest,
    isPending,
    data: response,
  } = useMutation<AxiosResponse, any, { url: string; method: string }>({
    mutationFn: async (variables) => {
      cancelRequestRef.current = axios.CancelToken.source();

      try {
        const response = await axios({
          url: variables.url,
          method: variables.method,
          params: {},
          headers: {},
          cancelToken: cancelRequestRef.current.token,
        });
        return response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) return error?.response;
        throw error;
      }
    },
    onSettled: (data) => {
      console.log("@", data);
    },
  });

  const handleCancel = () => {
    cancelRequestRef.current?.cancel();
  };

  return (
    <>
      <form
        className="request"
        onSubmit={handleSubmit((data) => {
          sendRequest(data);
        })}
      >
        <header>
          <div className="endpoint">
            <select {...register("method")}>
              {["get", "post", "put", "patch", "delete"].map((method) => (
                <option key={method}>{method}</option>
              ))}
            </select>
            <input type="text" placeholder="URL" {...register("url")} />
          </div>

          {!isPending && (
            <button className="fill" type="submit">
              Send
            </button>
          )}
          {isPending && (
            <button className="fill" type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </header>
        <div>
          <ul className="tabs">
            {["params", "headers", "body"].map((tab) => (
              <li key={tab}>
                <button type="button">{tab}</button>
              </li>
            ))}
          </ul>
        </div>
        <div></div>
      </form>
      <section className="response">
        <header>
          <ul className="tabs">
            {["body", "cookies", "headers"].map((tab) => (
              <li key={tab}>
                <button type="button">{tab}</button>
              </li>
            ))}
          </ul>
          <div className="meta">
            <div>
              <span>Status:</span>
              <span>{response?.status}</span>
            </div>
            <div>
              <span>Time: 38 ms</span>
            </div>
            <div>
              <span>Size: 1.82 KB</span>
            </div>
          </div>
        </header>

        <div className="tab-pane">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="json"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
            value={response?.data ? JSON.stringify(response.data, null, 2) : ""}
          />
        </div>
      </section>
    </>
  );
}

export default App;
