import axios from "axios";

import { decodeErrorResponse, decodeResponse } from "./decoder";
import { extendConfig, extendErrorResponse, extendResponse } from "./duration";

const postman = axios.create();

postman.interceptors.request.use(extendConfig);
postman.interceptors.response.use(extendResponse, extendErrorResponse);

postman.interceptors.response.use(decodeResponse, decodeErrorResponse);

postman.interceptors.request.use((config) => {
  config.headers.set("Postman-Target-Url", config.url);
  config.url = `/api/proxy`;
  return config;
});

export default postman;
