import { Input } from "../../../ui-components/InputComponent";
import { Select } from "../../../ui-components/SelectComponent";
import DtRestrictionOperator from "./DtRestrictionOperator";

type Props = {
  register: any;
  watch: any;
};

const DtRestrictOpt = [
  { key: "BD", value: "Business Date" },
  { key: "OPD", value: "Dynamic Date" },
  { key: "HCD", value: "Hardcoded Date" },
];

function FormTypeDateComponent({ register, watch }: Props) {
  const watchDtRestrictionMin = watch("DtRestrictOptMin");
  const watchDtRestrictionMax = watch("DtRestrictOptMax");

  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Label
        </label>
        <Input name="Label" register={register} />
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Variable
        </label>
        <Input name="Variable" register={register} />
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Required Field?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsRequired")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Callback Option?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsCallback")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Readonly?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsReadonly")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Hide Input?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsHide")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Input Editable When Mode Edit?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsEditable")} />
        </div>
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Date Restriction Min Option
        </label>
        <Select
          name="DtRestrictOptMin"
          register={register}
          keyval={DtRestrictOpt}
        />
      </div>
      {watchDtRestrictionMin === "OPD" ? (
        <>
          <DtRestrictionOperator register={register} name="Min" />
        </>
      ) : null}
      {watchDtRestrictionMin === "HCD" ? (
        <>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Minimum Date
            </label>
            <Input name="Min" inputType="date" register={register} />
          </div>
        </>
      ) : null}
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Date Restriction Max Option
        </label>
        <Select
          name="DtRestrictOptMax"
          register={register}
          keyval={DtRestrictOpt}
        />
      </div>
      {watchDtRestrictionMax === "OPD" ? (
        <>
          <>
            <DtRestrictionOperator register={register} name="Max" />
          </>
        </>
      ) : null}
      {watchDtRestrictionMax === "HCD" ? (
        <>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Maximum Date
            </label>
            <Input name="Max" inputType="date" register={register} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default FormTypeDateComponent;
