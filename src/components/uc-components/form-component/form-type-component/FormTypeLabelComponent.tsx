import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
};

function FormTypeLabelComponent({ register }: Props) {
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
    </>
  );
}

export default FormTypeLabelComponent;
