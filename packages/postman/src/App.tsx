import Editor from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import prettyBytes from "pretty-bytes";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./App.scss";
import RequestBody from "./components/RequestBody";
import statuses from "./resources/statuses.json";

// Rozszerz typy Axios
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: { startTime: number; endTime?: number };
}

type CustomAxiosResponse<T = any> = AxiosResponse<T> & {
  config: CustomAxiosRequestConfig;
  duration?: number;
};

// Interceptor zapytań
axios.interceptors.request.use((config) => {
  (config as CustomAxiosRequestConfig).metadata = {
    startTime: Date.now(),
  };
  return config;
});

// Interceptor odpowiedzi
axios.interceptors.response.use(
  (response: CustomAxiosResponse) => {
    const { startTime } = response?.config?.metadata || {};
    const endTime = Date.now();
    response.duration = endTime - (startTime || endTime);
    return response;
  },
  (error: AxiosError) => {
    if (!error.response?.config) return Promise.reject(error);
    const { startTime } = (error?.response?.config as any)?.metadata || {};
    const endTime = Date.now();
    (error?.response as any).duration = endTime - (startTime || endTime);
    return Promise.reject(error);
  }
);

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") return new jsonWorker();
    if (label === "css" || label === "scss") return new cssWorker();
    if (label === "html" || label === "handlebars") return new htmlWorker();
    if (label === "typescript" || label === "javascript") return new tsWorker();
    return new editorWorker();
  },
};

loader.config({ monaco });
loader.init().then(/* ... */);

function App() {
  const cancelRequestRef = useRef<CancelTokenSource | null>(null);

  const form = useForm({
    defaultValues: {
      method: "get",
      url: "",
      body: undefined,
      params: {},
      headers: {},
    },
  });
  const { register, handleSubmit, watch } = form;

  const {
    mutate: sendRequest,
    isPending,
    data: response,
  } = useMutation<
    { status: string | number; duration?: number; data: any },
    any,
    { url: string; method: string; body?: string; headers: {} }
  >({
    mutationFn: async (variables) => {
      cancelRequestRef.current = axios.CancelToken.source();

      try {
        const response = await axios({
          url: variables.url,
          method: variables.method,
          params: {},
          headers: variables.headers,
          data: variables.body,
          cancelToken: cancelRequestRef.current.token,
        });
        return response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === "Network Error") {
          return { status: "CORS", duration: 0, data: "" };
        }
        if (axios.isAxiosError(error) && error.response) return error?.response;
        throw error;
      }
    },
  });

  const handleCancel = () => {
    cancelRequestRef.current?.cancel();
  };

  const method = watch("method");

  return (
    <FormProvider {...form}>
      <form
        className="request"
        onSubmit={handleSubmit((data) => {
          sendRequest(data);
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
        <div style={{ display: "flex", flex: 1 }}>
          <RequestBody />
        </div>
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
            <div className="field">
              <span>Status:</span>
              <span className="success">
                {response?.status}{" "}
                {response?.status &&
                  response?.status in statuses &&
                  statuses[response?.status as any as keyof typeof statuses]}
              </span>
            </div>
            <div className="field">
              <span>Time:</span>
              <span className="success">{(response as any)?.duration} ms</span>
            </div>
            <div className="field">
              <span>Size:</span>
              <span className="success">
                {prettyBytes(String(response?.data).length || 0)}
              </span>
            </div>
          </div>
        </header>

        <div className="tab-pane">
          <div className="editor-wrapper">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="json"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
              value={
                response?.data ? JSON.stringify(response.data, null, 2) : ""
              }
            />
          </div>
        </div>
      </section>
    </FormProvider>
  );
}

export default App;
