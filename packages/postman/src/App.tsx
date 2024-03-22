import { loader } from "@monaco-editor/react";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  isAxiosError,
} from "axios";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import qs from "qs";
import { useRef } from "react";
import Split from "react-split";

import "./App.scss";
import HitSend from "./assets/illustration-hit-send.svg";
import { Entry } from "./components/KeyValuePairs/types";
import Request from "./components/Request";
import { RequestData } from "./components/Request/types";
import Response from "./components/Response";
import { PostmanResponse } from "./components/Response/types";
import WithProgressBar from "./components/WithProgressBar";
import useOptimisticMutation from "./hooks/useOptimisticMutation";

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

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const decodeResBody = async (response: AxiosResponse) => {
  const contentType = response.headers["content-type"];
  const mimeType = contentType.split(";")[0];

  if (mimeType.includes("application/json")) {
    return JSON.parse(new TextDecoder().decode(response.data));
  } else if (["image/", "video/", "audio/"].some((x) => mimeType.includes(x))) {
    const blob = new Blob([response.data], { type: contentType });
    return await blobToBase64(blob);
  } else if (mimeType.includes("text/")) {
    return new TextDecoder().decode(response.data);
  } else {
    return response.data;
  }
};

axios.interceptors.response.use(
  async (response) => {
    response.data = await decodeResBody(response);

    return response;
  },
  async (error) => {
    if (isAxiosError(error) && error.response) {
      error.response.data = await decodeResBody(error.response);
    }
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

const createFormData = (entries: Entry<string | File>[]) => {
  const formData = new FormData();
  entries.forEach(({ key, value }) => formData.append(key, value));
  return formData;
};

function App() {
  const cancelRequestRef = useRef<CancelTokenSource | null>(null);

  const {
    mutate: sendRequest,
    isPending,
    data: response,
  } = useOptimisticMutation<PostmanResponse, any, RequestData>({
    mutationKey: [],
    mutationFn: async (variables) => {
      const {
        url,
        method,
        headerEntries,
        formDataEntries,
        formUrlencodedEntries,
        rawBody,
      } = variables;
      cancelRequestRef.current = axios.CancelToken.source();

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

      console.log(headers, body, contentType);

      try {
        const response = await axios({
          url: url,
          method: method,
          headers,
          data: body,
          cancelToken: cancelRequestRef.current.token,
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

  const handleCancel = () => {
    cancelRequestRef.current?.cancel();
  };

  return (
    <>
      <Split
        style={{ height: "100%" }}
        gutterSize={11}
        direction="vertical"
        minSize={[80, 40]}
      >
        <Request
          isPending={isPending}
          onSubmit={(data) => sendRequest(data)}
          onCancel={handleCancel}
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
    </>
  );
}

export default App;
