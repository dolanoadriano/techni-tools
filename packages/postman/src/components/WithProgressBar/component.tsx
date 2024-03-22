import React from "react";

import "./style.scss";
import { Props } from "./types";

const WithProgressBar: React.FC<Props> = (props) => {
  const { className, style, children, isPending } = props;

  return (
    <div
      className={`WithProgressBar ${className}`}
      style={style}
      data-pending={isPending}
    >
      {isPending && (
        <div className="overlay">
          <div className="progress-bar">
            <div />
          </div>
          <div className="info">
            <span>Sending request...</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default WithProgressBar;
