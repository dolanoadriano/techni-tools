import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";

import "./App.scss";
import Requester from "./components/Requester";
import { blobToBase64 } from "./utils";

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

function App() {
  return (
    <Requester
      requester={{ title: "", type: "http", data: undefined }}
    ></Requester>
  );
}

export default App;
