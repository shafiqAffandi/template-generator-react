import { Fragment, useState } from "react";
import usePageStore from "../../../stores/PageStore";
import { FormComponentType, FormInputType } from "../../../types/FormType";
import { matchesEl } from "../../../utils/utils";
import CriteriaFormModal from "./CriteriaFormModal";
import ManageServiceModal from "./ManageServiceModal";
import SubFormComponent from "./SubFormComponent";

type Props = {
  id: string;
  data: FormComponentType;
};

function FormComponent({ id, data }: Props) {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
  const pageStore = usePageStore();
  const onRemove = () => {
    pageStore.removeForm(id);
  };

  const onManageServiceUrl = () => {
    console.log("manage service");
    setIsManageOpen(() => true);
  };

  const onSetCriteria = () => {
    setIsCriteriaOpen(() => true);
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
            onClick={() => onManageServiceUrl()}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            Manage Service Url
          </button>
          <button
            onClick={() => onSetCriteria()}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            Set Criteria
          </button>
          <button
            onClick={() => onRemove()}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            remove
          </button>
        </div>
      </div>
      <ManageServiceModal
        id={id}
        open={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        data={data.serviceUrl}
      />
      <CriteriaFormModal
        id={id}
        open={isCriteriaOpen}
        onClose={() => setIsCriteriaOpen(false)}
        data={data.criteria}
      />
    </>
  );
}

export default FormComponent;
