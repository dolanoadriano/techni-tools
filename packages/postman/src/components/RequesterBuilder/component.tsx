import React from "react";

import Http from "../../assets/http.svg";
import Logo from "../../assets/logo.svg";
import "./style.scss";
import { Props } from "./types";

const RequesterBuilder: React.FC<Props> = (props) => {
  const { onCreate } = props;

  return (
    <div className={`RequesterBuilder`}>
      <img src={Logo} />
      <div>
        <h2>Techni Postman</h2>
        <span>Create a new request:</span>
        <ul>
          <li>
            <button className="tertiary" onClick={onCreate}>
              <img src={Http} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequesterBuilder;
