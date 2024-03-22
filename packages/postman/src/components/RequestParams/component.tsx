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

  return (
    <div className={`RequestParams`}>
      <h6>Query Params</h6>
      <KeyValuePairs
        entries={paramEntries}
        setEntries={(entries) => setValue("paramEntries", entries)}
      />
    </div>
  );
};

export default RequestParams;
