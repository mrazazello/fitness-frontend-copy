import { message } from "antd";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/index";

import { getErrors } from "../model/selectors/errorSelectors";
import { errorActions } from "../model/slice/errorSlice";

export const ShowToastMessage = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(getErrors);

  useEffect(() => {
    const { length } = errors;
    const lastMessage = length ? errors[length - 1] : undefined;
    if (lastMessage) {
      switch (lastMessage.type) {
        case "error":
          void message.error(lastMessage.message);
          break;
        case "success":
          void message.success(lastMessage.message);
          break;
        default:
          void message.info(lastMessage.message);
          break;
      }
    }
    if (length > 5) void dispatch(errorActions.shiftError());
  }, [errors]);

  return null;
};
