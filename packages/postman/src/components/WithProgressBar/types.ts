import { CSSProperties } from "react";

export type OwnProps = {
  className?: string;
  style?: CSSProperties;
  isPending: boolean;
  children: React.ReactNode;
};

export type Props = OwnProps;
