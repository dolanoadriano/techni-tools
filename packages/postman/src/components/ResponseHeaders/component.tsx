import React from "react";

import KeyValuePairs from "../KeyValuePairs";
import { Entry } from "../KeyValuePairs/types";
import "./style.scss";
import { Props } from "./types";

const ResponseHeaders: React.FC<Props> = (props) => {
  const { headers } = props;

  const entries: Entry[] = Object.entries(headers).map(
    ([key, value], index) => ({
      id: `${index}`,
      key,
      value,
      type: "text",
      checked: false,
    })
  );

  return (
    <div className={`ResponseHeaders`}>
      <KeyValuePairs entries={entries} setEntries={() => {}} />
    </div>
  );
};

export default ResponseHeaders;
