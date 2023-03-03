import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
};

function FormTypeAddressComponent({ register }: Props) {
  return (
    <>
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
        <label className="col-span-1">Uppercase Input?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsUppercase")} />
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
    </>
  );
}

export default FormTypeAddressComponent;
