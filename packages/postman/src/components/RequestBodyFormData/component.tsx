import React from "react";
import { useFormContext } from "react-hook-form";

import KeyValuePairs from "../KeyValuePairs";
import { RequestData } from "../Request/types";
import "./style.scss";
import { Props } from "./types";

const RequestBodyFormData: React.FC<Props> = (props) => {
  const {} = props;

  const { watch, setValue } = useFormContext<RequestData>();

  const formDataEntries = watch("formDataEntries");

  return (
    <div className={`RequestBodyFormData`}>
      <KeyValuePairs
        canChangeType
        canCreate
        canRemove
        canCheck
        entries={formDataEntries}
        setEntries={(entries) => setValue("formDataEntries", entries)}
      />
    </div>
  );
};

export default RequestBodyFormData;
