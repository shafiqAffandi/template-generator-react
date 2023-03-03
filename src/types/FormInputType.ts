export type FormInputTypeType = FormInputTypeBlank
  | FormInputTypeText
  | FormInputTypeTextarea
  | FormInputTypeDate
  | FormInputTypeDatetime
  | FormInputTypeTime
  | FormInputTypeBool
  | FormInputTypeNumeric
  | FormInputTypeCurrency
  | FormInputTypePercent
  | FormInputTypeLookup
  | FormInputTypeDdl
  | FormInputTypeLabel
  | FormInputTypeAddress;

export type FormInputTypeBlank = {
  Type: "BLANK",
};

export type FormInputTypeText = BaseFormInputType & {
  Type: "TEXT",
  Pattern?: ValidatorPatternType,
  CustomPattern?: CustomPatternType[],
  Min?: number,
  Max?: number,
  Value?: string,
  Placeholder?: string,
};

export type FormInputTypeTextarea = BaseFormInputType & {
  Type: "TEXTAREA",
  Pattern?: ValidatorPatternType,
  CustomPattern?: CustomPatternType[],
  Min?: number,
  Max?: number,
  Value?: string,
  Placeholder?: string,
};

export type FormInputTypeDate = BaseFormInputTypeNoUppercase & {
  Type: "DATE",
  Min?: string,
  Max?: string,
  Value?: string,
};

export type FormInputTypeDatetime = BaseFormInputTypeNoUppercase & {
  Type: "DATETIME",
  Min?: string,
  Max?: string,
  Value?: string,
};

export type FormInputTypeTime = BaseFormInputTypeNoUppercase & {
  Type: "TIME",
  Value?: string,
};

export type FormInputTypeBool = BaseFormInputTypeNoUppercase & {
  Type: "BOOL",
  Value?: boolean,
};

export type FormInputTypeNumeric = BaseFormInputTypeNoUppercase & {
  Type: "NUMERIC",
  Min?: number,
  Max?: number,
  Value?: number,
};

export type FormInputTypeCurrency = BaseFormInputTypeNoUppercase & {
  Type: "CURRENCY",
  CurrencyMaskConfig?: MaskConfigType,
  Min?: number,
  Max?: number,
  Value?: number,
};

export type FormInputTypePercent = BaseFormInputTypeNoUppercase & {
  Type: "PERCENT",
  CurrencyMaskConfig?: MaskConfigType,
  Min?: number,
  Max?: number,
  Value?: number,
};

export type FormInputTypeLookup = Omit<BaseFormInputTypeNoUppercase, "IsEditable"> & {
  Type: "LOOKUP",
};

export type FormInputTypeDdl = BaseFormInputTypeNoUppercase & {
  Type: "DDL",
  UseDefaultValue: boolean,
  DdlReqObj?: DdlReqObjType,
  DdlItemsObj?: KeyValueDdlItemsType[],
};

export type FormInputTypeLabel = {
  Type: "LABEL",
  Label: string,
  Variable: string,
  Value: string,
}

export type FormInputTypeAddress = {
  Type: "ADDRESS",
  Variable: string,
  IsRequired?: boolean,
  IsReadonly?: boolean,
  IsUpperCase?: boolean,
  IsHide?: boolean,
  IsEditable?: boolean,
}

type BaseFormInputTypeNoUppercase = Omit<BaseFormInputType, "IsUppercase">;

type BaseFormInputType = {
  Label: string,
  Variable: string,
  IsRequired?: boolean,
  IsUppercase?: boolean,
  IsCallback?: boolean,
  IsReadonly?: boolean,
  IsHide?: boolean,
  IsEditable?: boolean,
}

type MaskConfigType = {
  align?: "left" | "center" | "right",
  allowNegative?: boolean,
  decimal?: string,
  precision?: number,
  prefix?: string,
  suffix?: string,
  thousands?: string,
  nullable?: boolean,
  inputMode?: 0 | 1,
};

type DdlReqObjType = {
  Environment: string,
  Url: string,
  CustomObjName?: string,
  CustomKeyName?: string,
  CustomValueName?: string,
  ReqObj?: Record<string, string>
};

export enum ValidatorPattern {
  CHARACTER_ONLY = "^[a-zA-Z ]*$",
  CHARACTER_ONLY_REQUIRED = "^[a-zA-Z ]*$",
  CHARACTER_ONLY_NON_WHITESPACE = "^[a-zA-Z]*$",
  CHARACTER_ONLY_NON_WHITESPACE_REQUIRED = "^[a-zA-Z]+$",
  NUMBER_ONLY = "^[0-9]*$",
  NUMBER_ONLY_REQUIRED = "^[0-9]+$",
  NUMBER_ONLY_DECIMAL = "^[0-9]+([,.][0-9]+)?$",
  EMAIL_SMALL_CASE = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
  EMAIL_ALL_CASE = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$",
  MULTIPLE_EMAIL_ALL_CASE = "^(([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\s*;\\s*|\\s*$))+$",
  VAT_INVOICE = "^[A-Za-z0-9]{3}\.[A-Za-z0-9]{3}\.[A-Za-z0-9]{2}\.[A-Za-z0-9]{8}$",
  VAT_INVOICE_NUMBER_ONLY = "^[0-9]{2}.[0-9]{3}.[0-9]{3}.[0-9]{1}-[0-9]{3}.[0-9]{3}$"
}

type ValidatorPatternType = keyof typeof ValidatorPattern;

type KeyValueDdlItemsType = {
  Key: string,
  Value: string,
};

export type CustomPatternType = {
  pattern: string,
  invalidMsg: string,
};