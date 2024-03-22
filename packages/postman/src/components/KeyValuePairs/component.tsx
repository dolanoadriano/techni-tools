import { v4 as uuidv4 } from "uuid";

import KeyValue from "../KeyValue";
import "./style.scss";
import { Entry, Props } from "./types";

const KeyValuePairs = <TValue extends string | File>(props: Props<TValue>) => {
  const { entries, canChangeType, setEntries } = props;

  const nextEntry: Entry<TValue> = {
    id: uuidv4(),
    type: "text",
    key: "",
    value: "" as TValue,
    checked: true,
  };

  const handleChange = (id: Entry<TValue>["id"], nextEntry: Entry<TValue>) => {
    const idx = entries.findIndex((entry) => entry.id === id);

    const newEntries =
      idx === -1
        ? [...entries, { ...nextEntry }]
        : (entries as any).with(idx, nextEntry);
    setEntries(newEntries);
  };

  const handleRemove = (id: Entry<TValue>["id"]) => {
    const newEntries = entries.filter((entry) => entry.id !== id);
    setEntries(newEntries);
  };

  return (
    <table className={`KeyValuePairs`}>
      <thead>
        <tr>
          <td>
            <div>
              {entries.length > 0 && (
                <input
                  type="checkbox"
                  checked={entries.every(({ checked }) => checked)}
                  onChange={(event) => {
                    const { checked } = event.target;
                    setEntries(entries.map((entry) => ({ ...entry, checked })));
                  }}
                />
              )}
            </div>
          </td>
          <td>
            <div>
              <span>Key</span>
            </div>
          </td>
          <td>
            <div>
              <span>Value</span>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        {[...entries, nextEntry].map((entry, index) => (
          <KeyValue
            key={entry.id}
            entry={entry}
            canChangeType={canChangeType}
            canRemove={index < entries.length}
            canCheck={index < entries.length}
            showPlaceholder={index >= entries.length}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        ))}
      </tbody>
    </table>
  );
};

export default KeyValuePairs;
