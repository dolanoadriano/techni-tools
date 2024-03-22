import "./style.scss";
import { Props } from "./types";

const KeyValue = <TValue extends string | File>(props: Props<TValue>) => {
  const {
    entry,
    showPlaceholder,
    canChangeType,
    canCheck,
    canRemove,
    onChange,
    onRemove,
  } = props;
  const { id, type, key, value, readonly, checked } = entry;

  return (
    <tr className="KeyValue">
      <td>
        <div>
          {canCheck && (
            <input
              type="checkbox"
              checked={checked}
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
            type="text"
            placeholder={showPlaceholder ? "Key" : undefined}
            readOnly={readonly}
            value={key}
            onChange={(event) => {
              event.preventDefault();
              onChange?.(id, { ...entry, key: event.target.value });
            }}
          />
          {canChangeType && (
            <select
              value={type}
              disabled={readonly}
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
              type={"text"}
              placeholder={showPlaceholder ? "Value" : undefined}
              value={value as string}
              readOnly={readonly}
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
