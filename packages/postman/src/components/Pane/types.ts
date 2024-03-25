import { CSSProperties } from "react";

export type OwnProps = {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  isPending?: boolean;
};

export type Props = OwnProps;
