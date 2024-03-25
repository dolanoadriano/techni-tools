import { useThrottle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { v4 as uuid } from "uuid";

import RequesterComponent from "../Requester";
import { Requester } from "../Requester/types";
import RequesterBuilder from "../RequesterBuilder";
import { Props, Workspace } from "./types";

const WorkspaceComponent: React.FC<Props> = (props) => {
  const { initialWorkspace, onChange } = props;
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
  const throttledWorkspace = useThrottle(workspace, 5000);

  const [selectedRequesterId, setSelectedRequesterId] = useState<string>();

  const selectedRequester = workspace.requesters.find(
    ({ id }) => id === selectedRequesterId
  );

  useEffect(() => {
    if (selectedRequester?.id) return;
    if (!workspace.requesters.length) return;

    setSelectedRequesterId(workspace.requesters[0].id);
  }, [JSON.stringify(workspace.requesters), selectedRequester?.id]);

  useEffect(() => {
    console.log(throttledWorkspace);
    onChange(throttledWorkspace);
  }, [JSON.stringify(throttledWorkspace)]);

  const handleCreateButtonClick = () => {
    const newRequester: Requester = {
      id: uuid(),
      type: "http",
      data: {
        method: "get",
        url: "",
        paramEntries: [],
        headerEntries: [],
        formDataEntries: [],
        formUrlencodedEntries: [],
        rawBody: undefined,
        rawBodyLanguage: "plain",
      },
    };
    const nextRequesters = [...workspace.requesters, newRequester];
    setWorkspace({ ...workspace, requesters: nextRequesters });
    setSelectedRequesterId(newRequester.id);
  };

  const handleRemoveButtonClick = (id: Requester["id"]) => {
    const nextRequesters = workspace.requesters.filter(
      (requester) => requester.id !== id
    );
    setWorkspace({ ...workspace, requesters: nextRequesters });
  };

  const handleRequesterChange = (
    id: Requester["id"],
    nextRequester: Requester
  ) => {
    const index = workspace.requesters.findIndex(
      (requester) => requester.id === id
    );
    const nextRequesters = (workspace.requesters as any).with(index, {
      ...nextRequester,
    });

    setWorkspace({ ...workspace, requesters: nextRequesters });
  };

  return (
    <>
      <div className="app-bar">
        <div className="requester-tabs">
          <ul>
            {workspace.requesters.map(({ id, data }) => (
              <li
                key={id}
                className="requester-tab"
                data-selected={id === selectedRequesterId}
              >
                <button
                  className="select"
                  onClick={() => setSelectedRequesterId(id)}
                >
                  <span className="icon" data-method={data?.method}>
                    {data?.method}
                  </span>
                  <span className="title">
                    {data?.url || "Untitled request"}
                  </span>
                  <button
                    className="remove tertiary"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveButtonClick(id);
                    }}
                  >
                    <RxCross2 />
                  </button>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="options">
          <button className="create tertiary" onClick={handleCreateButtonClick}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      {selectedRequester && (
        <RequesterComponent
          key={selectedRequester.id}
          requester={selectedRequester}
          onChange={handleRequesterChange}
        ></RequesterComponent>
      )}
      {!selectedRequester && (
        <RequesterBuilder onCreate={handleCreateButtonClick} />
      )}
    </>
  );
};

export default WorkspaceComponent;
