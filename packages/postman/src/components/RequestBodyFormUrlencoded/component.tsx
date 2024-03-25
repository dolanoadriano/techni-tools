import React from "react";
import { useFormContext } from "react-hook-form";

import KeyValuePairs from "../KeyValuePairs";
import { RequestData } from "../Request/types";
import "./style.scss";
import { Props } from "./types";

const RequestBodyFormUrlencoded: React.FC<Props> = (props) => {
  const {} = props;

  const { watch, setValue } = useFormContext<RequestData>();

  const formDataEntries = watch("formUrlencodedEntries");

  return (
    <div className={`RequestBodyFormUrlencoded`}>
      <KeyValuePairs
        canCreate
        canCheck
        entries={formDataEntries}
        setEntries={(entries) => setValue("formUrlencodedEntries", entries)}
      />
    </div>
  );
};

export default RequestBodyFormUrlencoded;
