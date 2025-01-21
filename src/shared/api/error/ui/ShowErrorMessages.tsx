import { Alert, Typography } from "antd";

import { useAppSelector } from "@shared/hooks/useAppStore";

import { getErrors } from "../model/selectors/errorSelectors";

const { Text } = Typography;

export const ShowErrorMessages = () => {
  const errors = useAppSelector(getErrors).filter((el) => el.type === "error");
  const lastError = errors[errors.length - 1];

  return lastError ? (
    <Alert
      key="error"
      message={lastError.message}
      description={
        lastError.details &&
        "violations" in lastError.details &&
        lastError.details.violations.map((el, index) => (
          <Text key={`${el.code}${index}`}>
            {el.field}: {el.message}
          </Text>
        ))
      }
      type={lastError.type || "error"}
    />
  ) : null;
};
