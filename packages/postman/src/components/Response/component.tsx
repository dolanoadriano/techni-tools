import prettyBytes from "pretty-bytes";
import React, { useState } from "react";

import statuses from "../../resources/statuses.json";
import ResponseBody from "../ResponseBody";
import ResponseHeaders from "../ResponseHeaders";
import Tabs from "../Tabs";
import "./style.scss";
import { Props } from "./types";

const Response: React.FC<Props> = (props) => {
  const { response } = props;
  const [selectedTab, setSelectedTab] = useState<string>("body");

  const size = Number(response.headers["content-length"]?.toString()) || 0;

  return (
    <div className="Response">
      <header>
        <Tabs
          options={[
            { value: "body" },
            { value: "cookies" },
            {
              value: "headers",
              count: Object.values(response.headers).length,
            },
          ]}
          value={selectedTab}
          onChange={({ value }) => setSelectedTab(value)}
          renderOption={({ value, count }) => (
            <div className="tab-option">
              <span>{value}</span>{" "}
              {count !== undefined && count > 0 && (
                <span className="tab-count">({count})</span>
              )}
            </div>
          )}
        />

        <div className="meta">
          <div className="field">
            <span className="label">Status:</span>
            <span className="value success">
              {response?.status}{" "}
              {response?.status &&
                response?.status in statuses &&
                statuses[response?.status as any as keyof typeof statuses]}
            </span>
          </div>
          <div className="field">
            <span className="label">Time:</span>
            <span className="value success">
              {(response as any)?.duration} ms
            </span>
          </div>
          <div className="field">
            <span className="label">Size:</span>
            <span className="value success">
              {prettyBytes(size ?? String(response?.data).length ?? 0)}
            </span>
          </div>
        </div>
      </header>

      {response?.data && (
        <div className="tab-content">
          {selectedTab === "body" && (
            <ResponseBody
              data={response?.data}
              contentType={response?.headers?.["content-type"]}
            />
          )}
          {selectedTab === "headers" && (
            <ResponseHeaders headers={response.headers} />
          )}
        </div>
      )}
    </div>
  );
};

export default Response;
