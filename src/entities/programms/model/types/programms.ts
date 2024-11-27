export interface IProgramListItem {
  code: string;
  name: string;
  description: string;
  duration: number;
  calories: number;
}

export interface IProgrammsResponse {
  programs: { items: IProgramListItem[] };
}

export interface IProgrammResponse {
  program: IProgramListItem;
}

export interface IProgrammEditValues {
  name: string;
  description: string;
  duration: number;
  calories: number;
}

export type IProgrammEditRequest = IProgramListItem;

export interface IProgrammCreateResponse {
  code: string;
}

export interface IProgrammCreateRequest {
  name: string;
  description: string;
  duration: number;
  calories: number;
}
