import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeFormInput } from "../../../constant/TypeFormInput";
import usePageStore from "../../../stores/PageStore";
import {
  FormInputTypeAddress,
  FormInputTypeDate,
  FormInputTypeDdl,
  FormInputTypeLabel,
  FormInputTypeLookup,
  FormInputTypeNumeric,
  FormInputTypeText,
  FormInputTypeTextarea,
  FormInputTypeType,
} from "../../../types/FormInputType";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";
import FormTypeDateComponent from "./form-type-component/FormTypeDateComponent";
import FormTypeTextComponent from "./form-type-component/FormTypeTextComponent";
import FormTypeBaseInputComponent from "./form-type-component/FormTypeBaseInputComponent";
import FormTypeNumericComponent from "./form-type-component/FormTypeNumericComponent";
import FormTypeLookupComponent from "./form-type-component/FormTypeLookupComponent";
import FormTypeLabelComponent from "./form-type-component/FormTypeLabelComponent";
import FormTypeAddressComponent from "./form-type-component/FormTypeAddressComponent";
import FormTypeDdlComponent from "./form-type-component/FormTypeDdlComponent";

type Props = {
  data?: any;
  compIdx: number;
  idx: number;
  id: string;
  open: boolean;
  onClose: () => void;
};

function setDefaultValue(data: any, idx: number) {
  if (idx === -1) return {};
  if (
    data.formInput[idx].Type === "TEXT" ||
    data.formInput[idx].Type === "TEXTAREA"
  ) {
    const _data = data.formInput[idx] as FormInputTypeText;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      Pattern: _data.Pattern,
      IsRequired: _data.IsRequired,
      IsUppercase: _data.IsUppercase,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
      IsEditable: _data.IsEditable,
      Min: _data.Min,
      Max: _data.Max,
      Placeholder: _data.Placeholder,
      CustomPattern: _data.CustomPattern,
      UseCustomPattern: _data.CustomPattern === undefined ? false : true,
    };
  }

  if (
    data.formInput[idx].Type === "DATE" ||
    data.formInput[idx].Type === "DATETIME"
  ) {
    const _data = data.formInput[idx] as FormInputTypeDate;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      IsRequired: _data.IsRequired,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
      IsEditable: _data.IsEditable,
      Min: _data.Min,
      Max: _data.Max,
      MinDtCode: data.formInput[idx].MinDtCode ?? null,
      MinOperator: data.formInput[idx].MinOperator ?? null,
      MinValue: data.formInput[idx].MinValue ?? null,
      MaxDtCode: data.formInput[idx].MaxDtCode ?? null,
      MaxOperator: data.formInput[idx].MaxOperator ?? null,
      MaxValue: data.formInput[idx].MaxValue ?? null,
      DtRestrictOptMin: data.formInput[idx].DtRestrictOptMin ?? "",
      DtRestrictOptMax: data.formInput[idx].DtRestrictOptMax ?? "",
    };
  }

  if (
    data.formInput[idx].Type === "TIME" ||
    data.formInput[idx].Type === "BOOL"
  ) {
    const _data = data.formInput[idx] as FormInputTypeDate;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      IsRequired: _data.IsRequired,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
      IsEditable: _data.IsEditable,
    };
  }

  if (
    data.formInput[idx].Type === "NUMERIC" ||
    data.formInput[idx].Type === "CURRENCY" ||
    data.formInput[idx].Type === "PERCENT"
  ) {
    const _data = data.formInput[idx] as FormInputTypeNumeric;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      IsRequired: _data.IsRequired,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
      IsEditable: _data.IsEditable,
      Min: _data.Min,
      Max: _data.Max,
    };
  }

  if (data.formInput[idx].Type === "LOOKUP") {
    // need further config
    const _data = data.formInput[idx] as FormInputTypeDate;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      IsRequired: _data.IsRequired,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
    };
  }

  if (data.formInput[idx].Type === "LABEL") {
    // need further config
    const _data = data.formInput[idx] as FormInputTypeDate;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
    };
  }

  if (data.formInput[idx].Type === "DDL") {
    const _data = data.formInput[idx] as FormInputTypeDdl;
    return {
      Type: _data.Type,
      Label: _data.Label,
      Variable: _data.Variable,
      IsRequired: _data.IsRequired,
      IsCallback: _data.IsCallback,
      IsReadonly: _data.IsReadonly,
      IsHide: _data.IsHide,
      IsEditable: _data.IsEditable,
      UseDefaultValue: _data.UseDefaultValue,
      isUseAPI: data.formInput[idx].isUseAPI,
      DdlItemsObj: _data.DdlItemsObj,
      Environment: _data.DdlReqObj?.Environment ?? null,
      Url: _data.DdlReqObj?.Url ?? null,
      CustomObjName: _data.DdlReqObj?.CustomObjName ?? "ReturnObject",
      CustomKeyName: _data.DdlReqObj?.CustomKeyName ?? "Key",
      CustomValueName: _data.DdlReqObj?.CustomValueName ?? "Value",

      ReqObj: data.formInput[idx].isUseAPI
        ? setDdlReqObj(data.formInput[idx].DdlReqObj.DdlReqObj)
        : null,
    };
  }
}

function tranformToDdlReqObj(data: any) {
  const DdlReqObj: Record<string, string> = {};
  data.ReqObj.forEach((item: { PropName: string; PropValue: string }) => {
    DdlReqObj[item.PropName] = item.PropValue;
  });

  return {
    Environment: data.Environment,
    Url: data.Url,
    CustomObjName:
      data.CustomObjName === "" ? "ReturnObject" : data.CustomObjName,
    CustomKeyName: data.CustomKeyName === "" ? "Key" : data.CustomKeyName,
    CustomValueName:
      data.CustomValueName === "" ? "Value" : data.CustomValueName,
    DdlReqObj: DdlReqObj,
  };
}

function setDdlReqObj(data: any) {
  const keys = Object.keys(data) as (keyof typeof data)[];

  return keys.map((key) => {
    return { PropName: key, PropValue: data[key] };
  });
}

function AddFormInputComponent({
  open,
  id,
  compIdx,
  idx = -1,
  data = {},
  onClose,
}: Props) {
  if (!open) return null;

  const pageStore = usePageStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: setDefaultValue(data, idx),
  });

  const watchFormType = watch("Type");

  const onClickCancel = () => {
    // reset form here
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<any> = (dataInput) => {
    // console.log(dataInput);

    const comp: FormInputTypeType = {} as any;

    if (dataInput.Type === "TEXT" || dataInput.Type === "TEXTAREA") {
      const _data = dataInput as FormInputTypeText;
      if (dataInput.UseCustomPattern) {
        const _comp: FormInputTypeText = {
          Type: _data.Type,
          Label: _data.Label,
          Variable: _data.Variable,
          IsRequired: _data.IsRequired,
          IsUppercase: _data.IsUppercase,
          IsCallback: _data.IsCallback,
          IsReadonly: _data.IsReadonly,
          IsHide: _data.IsHide,
          IsEditable: _data.IsEditable,
          Min: _data.Min,
          Max: _data.Max,
          Placeholder: _data.Placeholder,
          CustomPattern: _data.CustomPattern,
        };
        Object.assign(comp, _comp);
      }
      if (!dataInput.UseCustomPattern) {
        const _comp: FormInputTypeText = {
          Type: _data.Type,
          Label: _data.Label,
          Variable: _data.Variable,
          Pattern: _data.Pattern,
          IsRequired: _data.IsRequired,
          IsUppercase: _data.IsUppercase,
          IsCallback: _data.IsCallback,
          IsReadonly: _data.IsReadonly,
          IsHide: _data.IsHide,
          IsEditable: _data.IsEditable,
          Min: _data.Min,
          Max: _data.Max,
          Placeholder: _data.Placeholder,
        };
        Object.assign(comp, _comp);
      }
    }

    if (dataInput.Type === "DATE" || dataInput.Type === "DATETIME") {
      const _data = dataInput as FormInputTypeDate;
      let min,
        max = null;
      if (dataInput.DtRestrictOptMin === "BD") {
        min = "BD";
      }
      if (dataInput.DtRestrictOptMax === "BD") {
        max = "BD";
      }
      if (dataInput.DtRestrictOptMin === "OPD") {
        min = dataInput.MinDtCode + dataInput.MinOperator + dataInput.MinValue;
      }
      if (dataInput.DtRestrictOptMax === "OPD") {
        max = dataInput.MaxDtCode + dataInput.MaxOperator + dataInput.MaxValue;
      }
      if (dataInput.DtRestrictOptMin === "HCD") {
        min = dataInput.Min;
      }
      if (dataInput.DtRestrictOptMax === "HCD") {
        max = dataInput.Max;
      }
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsCallback: _data.IsCallback,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
        IsEditable: _data.IsEditable,
        Min: min,
        Max: max,
        MinDtCode: dataInput.MinDtCode ?? null,
        MinOperator: dataInput.MinOperator ?? null,
        MinValue: dataInput.MinValue ?? null,
        MaxDtCode: dataInput.MaxDtCode ?? null,
        MaxOperator: dataInput.MaxOperator ?? null,
        MaxValue: dataInput.MaxValue ?? null,
        DtRestrictOptMin: dataInput.DtRestrictOptMin ?? "",
        DtRestrictOptMax: dataInput.DtRestrictOptMax ?? "",
      };
      Object.assign(comp, _comp);
    }

    if (dataInput.Type === "TIME" || dataInput.Type === "BOOL") {
      const _data = dataInput as FormInputTypeDate;
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsCallback: _data.IsCallback,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
        IsEditable: _data.IsEditable,
      };
      Object.assign(comp, _comp);
    }

    if (
      dataInput.Type === "NUMERIC" ||
      dataInput.Type === "CURRENCY" ||
      dataInput.Type === "PERCENT"
    ) {
      const _data = dataInput as FormInputTypeNumeric;
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsCallback: _data.IsCallback,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
        IsEditable: _data.IsEditable,
        Min: _data.Min,
        Max: _data.Max,
      };
      Object.assign(comp, _comp);
    }

    if (dataInput.Type === "LOOKUP") {
      // need further config
      const _data = dataInput as FormInputTypeLookup;
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsCallback: _data.IsCallback,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
      };
      Object.assign(comp, _comp);
    }

    if (dataInput.Type === "LABEL") {
      const _data = dataInput as FormInputTypeLabel;
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
      };
      Object.assign(comp, _comp);
    }

    if (dataInput.Type === "ADDRESS") {
      const _data = dataInput as FormInputTypeAddress;
      const _comp = {
        Type: _data.Type,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsUpperCase: _data.IsUpperCase,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
        IsEditable: _data.IsEditable,
      };
      Object.assign(comp, _comp);
    }

    if (dataInput.Type === "DDL") {
      const _data = dataInput as FormInputTypeDdl;
      const _comp = {
        Type: _data.Type,
        Label: _data.Label,
        Variable: _data.Variable,
        IsRequired: _data.IsRequired,
        IsCallback: _data.IsCallback,
        IsReadonly: _data.IsReadonly,
        IsHide: _data.IsHide,
        IsEditable: _data.IsEditable,
        UseDefaultValue: _data.UseDefaultValue,
        isUseAPI: dataInput.isUseAPI,
        DdlItemsObj: !dataInput.isUseAPI ? _data.DdlItemsObj : null,
        DdlReqObj: dataInput.isUseAPI ? tranformToDdlReqObj(dataInput) : null,
      };
      Object.assign(comp, _comp);
    }

    // console.log(comp);

    if (idx === -1) {
      pageStore.addFormInput(id, compIdx, comp);
    }
    if (idx >= 0) {
      pageStore.editFormInput(id, compIdx, idx, comp);
    }
    reset();
    onClose();
  };

  return (
    <>
      <Modal>
        <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
            onClick={() => onClickCancel()}
          >
            cancel
          </button>
        </div>
        <p>form goes here</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Form Type
            </label>
            <Select name="Type" register={register} keyval={TypeFormInput} />
          </div>
          {watchFormType === "BLANK" ? (
            <>
              <p>blank</p>
            </>
          ) : null}
          {watchFormType === "TEXT" ? (
            <>
              <FormTypeTextComponent
                register={register}
                watch={watch}
                control={control}
              />
            </>
          ) : null}
          {watchFormType === "TEXTAREA" ? (
            <>
              <>
                <FormTypeTextComponent
                  register={register}
                  watch={watch}
                  control={control}
                />
              </>
            </>
          ) : null}
          {watchFormType === "DATE" ? (
            <>
              <FormTypeDateComponent register={register} watch={watch} />
            </>
          ) : null}
          {watchFormType === "DATETIME" ? (
            <>
              <FormTypeDateComponent register={register} watch={watch} />
            </>
          ) : null}
          {watchFormType === "TIME" ? (
            <>
              <FormTypeBaseInputComponent register={register} />
            </>
          ) : null}
          {watchFormType === "BOOL" ? (
            <>
              <FormTypeBaseInputComponent register={register} />
            </>
          ) : null}
          {watchFormType === "NUMERIC" ? (
            <>
              <FormTypeNumericComponent register={register} />
            </>
          ) : null}
          {watchFormType === "CURRENCY" ? (
            <>
              <FormTypeNumericComponent register={register} />
            </>
          ) : null}
          {watchFormType === "PERCENT" ? (
            <>
              <FormTypeNumericComponent register={register} />
            </>
          ) : null}
          {watchFormType === "LOOKUP" ? (
            <>
              <FormTypeLookupComponent register={register} />
            </>
          ) : null}
          {watchFormType === "DDL" ? (
            <>
              <FormTypeDdlComponent
                register={register}
                control={control}
                watch={watch}
              />
            </>
          ) : null}
          {watchFormType === "LABEL" ? (
            <>
              <FormTypeLabelComponent register={register} />
            </>
          ) : null}
          {watchFormType === "ADDRESS" ? (
            <>
              <FormTypeAddressComponent register={register} />
            </>
          ) : null}
          <div className="w-full">
            <input
              type="submit"
              value={data === undefined ? "Add" : "Save Changes"}
              className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddFormInputComponent;
