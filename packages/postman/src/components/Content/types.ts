export type ContentType =
  | "text/plain"
  | "text/html"
  | "application/json"
  | "application/javascript"
  | "text/css"
  | "text/xml"
  | "application/xml"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "video/mp4"
  | "audio/mpeg"
  | "application/pdf"
  | "application/zip";

export type OwnProps = {
  contentType: ContentType;
  content: string;
};

export type Props = OwnProps;
