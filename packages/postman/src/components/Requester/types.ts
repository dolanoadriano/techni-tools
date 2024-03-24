import { RequestData } from "../Request/types";

export type Requester<TType = "http"> = {
  id: string;
  type: TType;
  data: RequestData<TType>;
};

export type OwnProps = {
  requester: Requester;
  onChange: (id: Requester["id"], nextRequester: Requester) => void;
};

export type Props = OwnProps;
