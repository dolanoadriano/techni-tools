import { Entry } from "../KeyValuePairs/types";

export type RequestData<TType = "http"> = {
  method: string;
  url: string;
  paramEntries: Entry[];
  headerEntries: Entry[];
  formDataEntries: Entry<string | File>[];
  formUrlencodedEntries: Entry[];
  rawBody: string | undefined;
  rawBodyLanguage: string;
};

export type OwnProps = {
  isPending: boolean;
  onSubmit: (data: RequestData) => void;
  onCancel: () => void;
};

export type Props = OwnProps;
