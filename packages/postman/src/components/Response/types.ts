import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export type PostmanResponse = {
  status: string | number;
  duration?: number;
  data: any;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
};

export type OwnProps = {
  response: PostmanResponse;
};

export type Props = OwnProps;
