import axios from "axios";

import { decodeErrorResponse, decodeResponse } from "./decoder";
import { extendConfig, extendErrorResponse, extendResponse } from "./duration";

const postman = axios.create();

postman.interceptors.request.use(extendConfig);
postman.interceptors.response.use(extendResponse, extendErrorResponse);

postman.interceptors.response.use(decodeResponse, decodeErrorResponse);

export default postman;
