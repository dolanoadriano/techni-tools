import "./style.scss";
import { Props } from "./types";

const Tabs = <TOption extends { value: string }>(props: Props<TOption>) => {
  const { options, renderOption, value, onChange } = props;

  return (
    <div className="Tabs">
      <ul>
        {options.map((option) => (
          <li
            className={option.value === value ? "selected" : ""}
            key={option.value}
          >
            <button type="button" onClick={() => onChange(option)}>
              {renderOption ? renderOption(option) : option.value}
            </button>
          </li>
        ))}
      </ul>
      <select
        value={value}
        onChange={(event) =>
          onChange(
            options.find((option) => option.value === event.target.value)!
          )
        }
      >
        {options.map((option) => (
          <option value={option.value}>{option.value}</option>
        ))}
      </select>
    </div>
  );
};

export default Tabs;
