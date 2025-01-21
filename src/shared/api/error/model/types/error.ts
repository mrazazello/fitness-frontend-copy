import type { RootState } from "@app/providers/StoreProvider/store";

type IAlertType = "success" | "warning" | "error" | "info";

type ErrorDebugDetail = {
  trace: string;
};

type ErrorValidationDetails = {
  violations: {
    code: string;
    message: string;
    field: string;
  }[];
};

// error type for custom async Thunks error
export interface IThunkCustomError {
  message: string;
  code?: string;
  name?: string;
  details?: ErrorDebugDetail | ErrorValidationDetails;
  type: IAlertType;
}

export interface IThunkConfig {
  rejectValue: IThunkCustomError;
  state: RootState;
}
