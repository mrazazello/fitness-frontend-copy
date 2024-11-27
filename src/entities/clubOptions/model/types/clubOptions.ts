export interface IClubOptionsItem {
  code: string;
  name: string;
  icon: string;
}

export interface IClubsOptionsResponse {
  options: { items: IClubOptionsItem[] };
}

export interface IOptionEditRequest {
  code: string;
  name: string;
  icon: string;
}

export interface IClubOptionCreateRequest {
  clubCode: string;
  name: string;
  icon: string;
}

export interface IClubOptionCreateResponse {
  code: string;
}
