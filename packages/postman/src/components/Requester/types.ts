import { RequestData } from "../Request/types";

export type Requester<TType = "http"> = {
  title: string | undefined;
  type: TType;
  data: RequestData<TType> | undefined;
};

export type OwnProps = {
  requester: Requester;
};

export type Props = OwnProps;
