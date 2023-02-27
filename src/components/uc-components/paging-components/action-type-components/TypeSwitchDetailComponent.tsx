import { useFieldArray } from "react-hook-form";

type Props = {
  register: any;
  control: any;
};

function TypeSwitchDetailComponent({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "conditions", // unique name for your Field Array
  });

  return (
    <div className="border border-solid border-cyan-200 p-2">
      <div className="flex">
        <div className="float-right m-1">
          <button
            className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
            type="button"
            //@ts-ignore
            onClick={() => append({})}
          >
            Add Condition
          </button>
        </div>
      </div>
    </div>
  );
}

export default TypeSwitchDetailComponent;
