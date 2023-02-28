import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
  arrName?: string;
};

function ActionTypeDeleteComponent({ register, arrName = "" }: Props) {
  if (arrName !== "") arrName = `${arrName}.`;
  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Property
        </label>
        <Input name={`${arrName}` + "property"} register={register} />
      </div>
    </>
  );
}

export default ActionTypeDeleteComponent;
