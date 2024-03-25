import React from "react";

import HitSend from "../../assets/illustration-hit-send.svg";
import "./style.scss";
import { Props } from "./types";

const EmptyResponse: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className={`EmptyResponse`}>
      <header>
        <span>Response</span>
      </header>
      <div>
        <img src={HitSend} />
        <span>Click Send to get a response</span>
      </div>
    </div>
  );
};

export default EmptyResponse;
