export type TerrorSours = {
  path: string | number;
  message: string;
}[];

export type TGanaricErrorHandeler = {
  statusCod: number;
  message: string;
  errorSours: TerrorSours;
};

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
