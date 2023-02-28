import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
  arrName?: string;
};

function ActionTypeCallbackComponent({ register, arrName = "" }: Props) {
  if (arrName !== "") arrName = `${arrName}.`;
  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Key
        </label>
        <Input name={`${arrName}` + "key"} register={register} />
      </div>
    </>
  );
}

export default ActionTypeCallbackComponent;
