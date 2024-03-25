import React from "react";

import "./style.scss";
import { Props } from "./types";

const Illustration: React.FC<Props> = (props) => {
  const { src, description } = props;

  return (
    <div className={`Illustration`}>
      <img src={src} />
      <span>{description}</span>
    </div>
  );
};

export default Illustration;
