export interface IDocsListItem {
  code: string;
  name: string;
  slug: string;
  color: string;
  mainPageShow: boolean;
}

export interface IDocsListResponse {
  documents: { items: IDocsListItem[] };
}

export interface IDocDetail {
  code: string;
  name: string;
  slug: string;
  color: string;
  mainPageShow: boolean;
  description: string;
}

export interface IDocDetailResponse {
  document: IDocDetail;
}

export interface IDocEditValues {
  name: string;
  color: string;
  slug: string;
  mainPageShow: boolean;
  description: string;
}

export interface IDocCreateResponse {
  code: string;
}

export type IDocCreateRequest = IDocEditValues;

export interface IDocEditRequest extends IDocCreateRequest {
  code: string;
}
