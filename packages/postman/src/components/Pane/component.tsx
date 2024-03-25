import React from "react";

import WithProgressBar from "../WithProgressBar";
import "./style.scss";
import { Props } from "./types";

const Pane: React.FC<Props> = (props) => {
  const { children, style, isPending = false, className } = props;

  return (
    <WithProgressBar
      className={`Pane ${className}`}
      style={style}
      isPending={isPending}
    >
      {children}
    </WithProgressBar>
  );
};

export default Pane;
