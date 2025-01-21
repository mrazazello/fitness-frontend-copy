export interface IOption {
  label: string;
  value: string;
}

export interface IGroupedOptions {
  label: string;
  options: IOption[];
}

export interface IFilterOption {
  text: string;
  value: string;
}
