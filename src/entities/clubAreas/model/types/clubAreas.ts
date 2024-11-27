export interface IClubAreasItem {
  code: string;
  name: string;
}

export interface IClubAreaCreateRequest {
  clubCode: string;
  name: string;
}

export interface IClubAreaCreateResponse {
  code: string;
}

export interface IAreaEditRequest {
  code: string;
  name: string;
}

export interface IAllAreaItem {
  code: string;
  name: string;
  club: {
    code: string;
    name: string;
    contactPhone: string;
  };
}

export interface IAllAreasResponse {
  areas: {
    items: IAllAreaItem[];
  };
}

export interface IClubsAreasResponse {
  areas: { items: IClubAreasItem[] };
}
