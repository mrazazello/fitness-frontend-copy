import type { RootState } from "@app/index";
import { getAccessToken, getAuthIsLoading } from "./authSelectors";

const testState: DeepPartial<RootState> = {
  auth: {
    accessToken: "test token",
    loading: "loading"
  }
};

describe("Auth Selectors tests", () => {
  test("getAccessToken should return token", () => {
    expect(getAccessToken(testState as RootState)).toBe("test token");
  });

  test("getAuthIsLoading should return 'loading'", () => {
    expect(getAuthIsLoading(testState as RootState)).toBe("loading");
  });
});
