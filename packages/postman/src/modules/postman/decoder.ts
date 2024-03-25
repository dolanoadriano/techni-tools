import { AxiosResponse, isAxiosError } from "axios";

import { blobToBase64 } from "../../utils";

const decodeResBody = async (response: AxiosResponse) => {
  const contentType: string | undefined = response.headers["content-type"];

  const mimeType = contentType?.split(";")[0];

  if (!mimeType) return " ";
  if (mimeType.includes("application/json")) {
    return JSON.parse(new TextDecoder().decode(response.data));
  }
  if (["image/", "video/", "audio/"].some((x) => mimeType.includes(x))) {
    const blob = new Blob([response.data], { type: contentType });
    return await blobToBase64(blob);
  }
  if (mimeType.includes("text/")) {
    return new TextDecoder().decode(response.data);
  }
  return response.data;
};

export const decodeResponse = async (response: AxiosResponse) => {
  response.data = await decodeResBody(response);
  return response;
};

export const decodeErrorResponse = async (error: unknown) => {
  if (!isAxiosError(error)) return Promise.reject(error);
  if (!error.response) return Promise.reject(error);
  error.response = await decodeResponse(error.response);
  return Promise.reject(error);
};
