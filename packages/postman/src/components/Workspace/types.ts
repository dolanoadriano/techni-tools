import { Requester } from "../Requester/types";

export type Workspace = {
  requesters: Requester[];
};

export type OwnProps = {
  initialWorkspace: Workspace;
  onChange: (workspace: Workspace) => void;
};

export type Props = OwnProps;
