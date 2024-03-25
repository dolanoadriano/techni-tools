import React from "react";

import Illustration from "../Illustration";
import "./style.scss";
import { Props } from "./types";

const EmptyResponse: React.FC<Props> = (props) => {
  const { illustrationSrc, text } = props;

  return (
    <div className={`EmptyResponse`}>
      <header>
        <span>Response</span>
      </header>
      <div>
        <Illustration src={illustrationSrc} description={text} />
      </div>
    </div>
  );
};

export default EmptyResponse;
