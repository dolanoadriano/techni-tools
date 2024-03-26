import "./style.scss";
import { ControlName, Props } from "./types";

const KeyValue = <TValue extends string | File>(props: Props<TValue>) => {
  const {
    entry,
    disabled,
    showPlaceholder,
    canChangeType,
    canCheck,
    canRemove,
    onChange,
    onRemove,
  } = props;
  const { id, type, key, value, readonly, checked } = entry;

  const getIsDisabled = (controlName: ControlName<TValue>) => {
    if (disabled === undefined) return undefined;
    if (typeof disabled === "boolean") return disabled;
    return disabled[controlName];
  };

  return (
    <tr className="KeyValue">
      <td>
        <div>
          {canCheck && (
            <input
              name={"type"}
              type="checkbox"
              checked={checked}
              disabled={getIsDisabled("type")}
              onChange={(event) => {
                onChange?.(id, { ...entry, checked: event.target.checked });
              }}
            />
          )}
        </div>
      </td>
      <td>
        <div>
          <input
            name={"key"}
            type="text"
            placeholder={showPlaceholder ? "Key" : undefined}
            readOnly={readonly}
            value={key}
            disabled={getIsDisabled("key")}
            onChange={(event) => {
              event.preventDefault();
              onChange?.(id, { ...entry, key: event.target.value });
            }}
          />
          {canChangeType && (
            <select
              name={"type"}
              value={type}
              disabled={readonly || getIsDisabled("type")}
              onChange={(event) => {
                onChange?.(id, {
                  ...entry,
                  type: event.target.value as "text" | "file",
                  value: "" as TValue,
                });
              }}
            >
              <option value={"text"}>text</option>
              <option value={"file"}>file</option>
            </select>
          )}
        </div>
      </td>
      <td>
        <div>
          {type === "text" && (
            <input
              name={"value"}
              type={"text"}
              placeholder={showPlaceholder ? "Value" : undefined}
              value={value as string}
              readOnly={readonly}
              disabled={getIsDisabled("value")}
              onChange={(event) => {
                event.preventDefault();
                onChange?.(id, {
                  ...entry,
                  value: event.target.value as TValue,
                });
              }}
            />
          )}
          {type === "file" && (
            <input
              name={"value"}
              type={"file"}
              placeholder={showPlaceholder ? "Value" : undefined}
              readOnly={readonly}
              onChange={(event) => {
                event.target.files?.[0] &&
                  onChange?.(id, {
                    ...entry,
                    value: event.target.files[0] as TValue,
                  });
              }}
            />
          )}
        </div>
      </td>
      <td style={{ position: "absolute", right: 0, border: "none" }}>
        <ul className="options">
          {canRemove && !readonly && (
            <button type="button" onClick={() => onRemove?.(id)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 1V0H8V1H11V2H1V1H4Z" fill="#6B6B6B"></path>
                <path
                  d="M3 10.5V3H2V10.5C2 11.3284 2.67157 12 3.5 12H8.5C9.32843 12 10 11.3284 10 10.5V3H9V10.5C9 10.7761 8.77614 11 8.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z"
                  fill="#6B6B6B"
                ></path>
                <path d="M4.25 10V3H5.25V10H4.25Z" fill="#6B6B6B"></path>
                <path d="M6.75 3V10H7.75V3H6.75Z" fill="#6B6B6B"></path>
              </svg>
            </button>
          )}
        </ul>
      </td>
    </tr>
  );
};

export default KeyValue;
