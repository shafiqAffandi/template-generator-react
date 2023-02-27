import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
};

function ActionTypeDeleteComponent({ register }: Props) {
  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Property
        </label>
        <Input name="property" register={register} />
      </div>
    </>
  );
}

export default ActionTypeDeleteComponent;
