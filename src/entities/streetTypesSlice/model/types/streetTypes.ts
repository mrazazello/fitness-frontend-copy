export interface IStreetTypeItem {
  name: string;
  title: string;
  shortTitle: string;
}

export interface IStreetTypesResponse {
  types: { items: IStreetTypeItem[] };
}
