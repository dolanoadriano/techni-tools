import { Entry } from "../KeyValuePairs/types";

export type OwnProps<TValue extends string | File> = {
  entry: Entry<TValue>;
  disabled?: boolean;
  canChangeType?: boolean;
  canRemove?: boolean;
  canCheck?: boolean;
  showPlaceholder?: boolean;
  onChange?: (id: Entry<TValue>["id"], nextEntry: Entry<TValue>) => void;
  onRemove?: (id: Entry<TValue>["id"]) => void;
};

export type Props<TValue extends string | File> = OwnProps<TValue>;
