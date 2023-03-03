import { Fragment } from "react";
import usePageStore from "../../../stores/PageStore";
import { FormComponentType, FormInputType } from "../../../types/FormType";
import SubFormComponent from "./SubFormComponent";

type Props = {
  id: string;
  data: FormComponentType;
};

function FormComponent({ id, data }: Props) {
  const pageStore = usePageStore();
  const onRemove = () => {
    pageStore.removeForm(id);
  };

  return (
    <>
      <div className="mt-3 border-2 border-solid border-blue-500 p-8">
        <div>
          <div>{JSON.stringify(data)}</div>
          {data.subsection.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <SubFormComponent data={item} id={id} idx={idx} />
              </Fragment>
            );
          })}
          <button
            onClick={() => onRemove()}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
}

export default FormComponent;
