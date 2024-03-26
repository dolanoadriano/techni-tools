import { ControlName } from "../KeyValue/types";

export type Entry<TValue extends string | File = string> = {
  id: string;
  key: string;
  value: TValue;
  type: "text" | "file";
  checked?: boolean;
  readonly?: boolean;
};

export type OwnProps<TValue extends string | File> = {
  canChangeType?: boolean;
  canCreate?: boolean;
  canRemove?: boolean;
  canCheck?: boolean;
  entries: Entry<TValue>[];
  disabled?: boolean | Partial<Record<ControlName<TValue>, boolean>>;
  setEntries: (entries: Entry<TValue>[]) => void;
};

export type Props<TValue extends string | File> = OwnProps<TValue>;
