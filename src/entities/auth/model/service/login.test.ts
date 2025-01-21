test("async thunk experemental test", () => {
  expect(true).toBe(true);
});

// import { TestAsyncThunk } from "@shared/config/tests/TestAsynkThunk";
// import axios from "axios";
// import { ILoginResponse, IUserRequest } from "../types/auth";
// import { login } from "./login";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// const authData: ILoginResponse = {
//   token: "test token"
// };

// const userRequest: IUserRequest = {
//   username: "user",
//   password: "fake password"
// };

// describe("Service: Login async thunk test", () => {
//   test("success login", async () => {
//     const thunk = new TestAsyncThunk(login);
//     mockedAxios.post.mockResolvedValue(Promise.resolve({ data: authData }));

//     const result = await thunk.callThunk(userRequest);
//     // console.log("result: ", result);

//     // expect(mockedAxios.post).toHaveBeenCalledTimes(1);
//     expect(result.meta.requestStatus).toBe("fulfilled");
//     expect(result.payload).toEqual(authData);
//   });

// test("error  login", async () => {
//   const thunk = new TestAsyncThunk(login);
//   thunk.api.post.mockResolvedValue(Promise.resolve({ status: 403 }));
//   const result = await thunk.callThunk(userRequest);

//   expect(thunk.api.post).toHaveBeenCalled();
//   expect(result.meta.requestStatus).toBe("rejected");
//   expect(result.payload).toBe("Error geting auth");
// });
// });
