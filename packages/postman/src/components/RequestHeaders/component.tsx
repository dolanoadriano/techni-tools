import React from "react";
import { useFormContext } from "react-hook-form";

import KeyValuePairs from "../KeyValuePairs";
import { RequestData } from "../Request/types";
import "./style.scss";
import { Props } from "./types";

const RequestHeaders: React.FC<Props> = (props) => {
  const {} = props;

  const { watch, setValue } = useFormContext<RequestData>();

  const headerEntries = watch("headerEntries");

  return (
    <div className={`RequestHeaders`}>
      <h6>Headers</h6>
      <KeyValuePairs
        canCreate
        canCheck
        entries={headerEntries}
        setEntries={(entries) => setValue("headerEntries", entries)}
      />
    </div>
  );
};

export default RequestHeaders;
