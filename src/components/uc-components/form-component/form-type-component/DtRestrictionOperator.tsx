import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../../../ui-components/InputComponent";
import { Select } from "../../../ui-components/SelectComponent";

type Props = {
  register: any;
  name: string;
};

const timeOption = [
  { key: "Y", value: "Year" },
  { key: "M", value: "Month" },
  { key: "D", value: "Day" },
];

function DtRestrictionOperator({ register, name }: Props) {
  return (
    <ul className="w-full">
      <div className="grid grid-cols-12">
        <div className="col-span-4 p-1">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Date Code
          </label>
          <Select
            register={register}
            name={`${name}DtCode`}
            keyval={timeOption}
          />
        </div>
        <div className="col-span-4 p-1">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Operator
          </label>
          <Select
            register={register}
            name={`${name}Operator`}
            options={["+", "-"]}
          />
        </div>
        <div className="col-span-4 p-1">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Value
          </label>
          <Input register={register} name={`${name}Value`} inputType="number" />
        </div>
      </div>
    </ul>
  );
}

export default DtRestrictionOperator;
