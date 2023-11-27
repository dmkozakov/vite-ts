export interface ICountry {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  capital?: string;
  population?: number;
  languages?: string;
}

export type Response = ICountry[];
