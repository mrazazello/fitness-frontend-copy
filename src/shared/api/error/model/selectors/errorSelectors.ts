import type { RootState } from "@app/index";

export const getErrors = (state: RootState) => state.error.errors;
