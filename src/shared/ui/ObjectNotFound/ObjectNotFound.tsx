import { Result } from "antd";

export const ObjectNotFound = () => {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
    />
  );
};
