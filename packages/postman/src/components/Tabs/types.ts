export type OwnProps<TOption extends { value: string }> = {
  options: TOption[];
  value: string;
  onChange: (option: TOption) => void;
  renderOption?: (option: TOption) => React.ReactNode;
};

export type Props<TOption extends { value: string }> = OwnProps<TOption>;
