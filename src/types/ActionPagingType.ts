export type ParamType = {
  type: string;
  property: string;
};

export type ResultUrlType = {
  type: "url";
  path: string;
  icon: string;
  param: ParamType[];
};

export type ResultCallbackType = {
  type: "callback";
  key: string;
  icon: string;
  property: ParamType[];
};

export type ResultTextType = {
  type: "text" | "decimal" | "link" | "boolean";
  property: string;
};

export type ConditionCaseType = {
  isUser?: boolean;
  property: string;
  value: string;
  restriction: string;
};

export type ActionEditType = {
  type: "edit" | string;
  path: string;
  param: ParamType[];
  icon: string;
  pathOption: string;
};

export type ActionDeleteType = {
  type: "delete" | string;
  property: string;
};

export type ActionCallbackType = {
  type: "callback" | string;
  key: string;
};

export type ActionSwitchType = {
  type: "switch" | string;
  case: {
    conditions: ConditionCaseType[];
    result: ResultUrlType | ResultCallbackType | ResultTextType;
  };
};

export type ActionPagingType =
  | ActionEditType
  | ActionDeleteType
  | ActionCallbackType
  | ActionSwitchType;

export type InputActionPagingType = {
  actionType: string;
  label: string;
  position: string;
} & ActionPagingType;
