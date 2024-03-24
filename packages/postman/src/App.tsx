import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

import "./App.scss";
import { Requester } from "./components/Requester/types";
import WorkspaceComponent from "./components/Workspace";
import { Workspace } from "./components/Workspace/types";

function App() {
  const { mutate: readWorkspace, data } = useMutation<{
    data: Workspace;
  }>({
    mutationFn: async () => {
      const { data } = await axios.get("/api/workspace");
      return data;
    },
  });
  const { data: workspace } = data || {};

  const { mutate: updateWorkspace } = useMutation<
    {},
    any,
    { requesters: Requester[] }
  >({
    mutationFn: ({ requesters }) => axios.put("/api/workspace", { requesters }),
  });

  useEffect(() => {
    readWorkspace();
  }, []);

  return (
    <>
      {workspace && (
        <WorkspaceComponent
          initialWorkspace={workspace}
          onChange={(workspace) => updateWorkspace(workspace)}
        />
      )}
    </>
  );
}

export default App;
