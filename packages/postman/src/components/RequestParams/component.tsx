import React from "react";
import { useFormContext } from "react-hook-form";

import KeyValuePairs from "../KeyValuePairs";
import { RequestData } from "../Request/types";
import "./style.scss";
import { Props } from "./types";

const RequestParams: React.FC<Props> = (props) => {
  const {} = props;

  const { watch, setValue } = useFormContext<RequestData>();

  const paramEntries = watch("paramEntries");
  const pathVariableEntries = watch("pathVariableEntries");

  return (
    <div className={`RequestParams`}>
      <section>
        <h6>Query Params</h6>
        <KeyValuePairs
          canCreate
          canCheck
          canRemove
          entries={paramEntries}
          setEntries={(entries) => setValue("paramEntries", entries)}
        />
      </section>
      {pathVariableEntries?.length > 0 && (
        <section>
          <h6>Path Variables</h6>
          <KeyValuePairs
            disabled={{ key: true }}
            entries={pathVariableEntries}
            setEntries={(entries) => setValue("pathVariableEntries", entries)}
          />
        </section>
      )}
    </div>
  );
};

export default RequestParams;
