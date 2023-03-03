import { Suspense, useEffect, useState } from "react";
import { API_HOST_URL } from "../../../../environments/environment";
import { Input } from "../../../ui-components/InputComponent";
import { Select } from "../../../ui-components/SelectComponent";

type Props = {
  register: any;
};

function FormTypeLookupComponent({ register }: Props) {
  const [lookupData, setLookupData] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_HOST_URL}/pages/GetAllLookup`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        setLookupData(() => data);
      })
      .finally(() => {
        setLookupLoading(() => false);
      });
  }, []);

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
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Lookup From?
        </label>
        {lookupLoading ? (
          <>
            <p>loading</p>
          </>
        ) : (
          <Select name="LookupName" register={register} options={lookupData} />
        )}
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
    </>
  );
}

export default FormTypeLookupComponent;
