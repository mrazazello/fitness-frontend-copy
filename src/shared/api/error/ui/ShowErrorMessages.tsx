import { Alert, Typography } from "antd";
import { uniqueId } from "lodash";

import { useAppSelector } from "@app/index";

import { getErrors } from "../model/selectors/errorSelectors";

const { Text } = Typography;

export const ShowErrorMessages = () => {
  const errors = useAppSelector(getErrors).filter((el) => el.type === "error");
  const lastError = errors[errors.length - 1];

  return lastError ? (
    <Alert
      key={uniqueId()}
      message={lastError.message}
      description={
        lastError.details &&
        "violations" in lastError.details &&
        lastError.details.violations.map((el) => (
          <Text key={uniqueId()}>
            {el.field}: {el.message}
          </Text>
        ))
      }
      type={lastError.type || "error"}
    />
  ) : null;
};
