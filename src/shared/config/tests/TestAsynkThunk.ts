import { RootState } from "@app/index";
import { AsyncThunkAction } from "@reduxjs/toolkit";

import axios from "axios";

jest.mock("../env", () => ({
  envConfig: {
    BACKEND_API_URL: "http://localhost:mock",
    BACKEND_FILES_URL: "http://localhost:mock"
  }
}));

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;
  getState: () => RootState;
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
  // api: jest.MockedFunctionDeep<AxiosStatic>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<RootState>
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as RootState);
    // this.api = mockedAxios;
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    await this.dispatch(action);
    const result = await action(this.dispatch, this.getState, {
      api: axios
    });

    return result;
  }
}
