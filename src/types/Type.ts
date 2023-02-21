export type PageType = {
  title: string;
  id: string;
  addButton: boolean;
  hideButton: boolean;
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
    headerList?: [];
    bodyList?: [];
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
};

type SearchComponentTextboxType = SearchComponentTypeBase & {
  datatype?: string;
};

type SearchComponentDdlType = SearchComponentTypeBase & {
  isFromURL?: boolean;
  ddlType?: "all" | "one" | "none";
  environment?: string;
  items?: Record<string, string>[];
};

export type GridViewComponentType = {
  headerType: "label" | "sort";
  bodyType: "text" | "boolean" | "action";
  position: "left" | "center" | "right";
  label: string;
  columnName: string;
  property: string;
};

export type SearchComponentType =
  | SearchComponentTextboxType
  | SearchComponentDdlType;