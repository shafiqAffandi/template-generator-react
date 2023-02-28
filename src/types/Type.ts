import { ActionPagingType } from "./ActionPagingType";

export type PageType = {
  title: string;
  id: string;
  addButton: boolean;
  backButton: boolean;
  paging?: PagingInputType;
};

export type PagingInputType = {
  pagingInput: {
    title?: string;
    exportExcel?: boolean;
    querystring?: {
      [name: string]: string;
    };
    component?: SearchComponentType[];
    headerList?: HeaderPagingType[];
    bodyList?: BodyPagingType[];
  };
  criteria?: CriteriaPaging[];
};

export type CriteriaPaging = {
  restriction: string;
  propName: string;
  value: string;
};

type SearchComponentTypeBase = {
  type?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  id?: string;
};

type SearchComponentTextboxType = SearchComponentTypeBase & {
  datatype?: string;
};

type SearchComponentDdlType = SearchComponentTypeBase & {
  isFromURL?: boolean;
  ddlType?: "all" | "one" | "none";
  environment?: string;
  items?: { key: string; value: string }[];
  path?: string;
  criteriaPropName?: string;
  criteriaPropValue?: string;
};

export type SearchComponentType =
  | SearchComponentTextboxType
  | SearchComponentDdlType;

export type InputsSearchComponentType = {
  type: string;
  label: string;
  name: string;
  isFromURL: boolean;
  ddlType: "all" | "one" | "none";
  environment: string;
  path: string;
  items: { key: string; value: string }[];
  criteriaPropName: string;
  criteriaPropValue: string;
};

export type HeaderPagingType = {
  type: string;
  position: string;
  label: string;
  name?: string;
};

export type BodyPagingType = {
  type: string;
  position: string;
  property?: string;
  actionType?: string;
  action?: ActionPagingType[];
};

export type InputsGridViewType = {
  type: string;
  label: string;
  sortable: boolean;
  position: string;
  name: string;
  property: string;
  action: any;
};
