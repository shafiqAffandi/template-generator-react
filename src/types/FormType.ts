import { FormInputTypeType } from "./FormInputType";

export type FormInputType = {
  title: string;
  isVertical: boolean;
  isSubsection: boolean;
  formInput: FormInputTypeType[];
  onLoad: [];
  criteria: [];
};

export type FormComponentType = {
  subsection: FormInputType[];
  serviceUrl: Record<string, string>;
  criteria: { get: string, set: string }[];
};
