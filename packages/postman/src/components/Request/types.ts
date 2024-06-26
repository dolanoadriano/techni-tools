import { Entry } from "../KeyValuePairs/types";

export type RequestData<TType = "http"> = {
  method: string;
  url: string;
  paramEntries: Entry[];
  pathVariableEntries: Entry[];
  headerEntries: Entry[];
  formDataEntries: Entry<string | File>[];
  formUrlencodedEntries: Entry[];
  rawBody: string | undefined;
  rawBodyLanguage: string;
  selectedTab: string;
};

export type OwnProps = {
  isPending: boolean;
  onSubmit: (data: RequestData) => void;
  onCancel: () => void;
};

export type Props = OwnProps;
