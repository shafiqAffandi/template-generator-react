import usePageStore from "../stores/PageStore";
import FormComponent from "./uc-components/form-component/FormComponent";
import PagingComponent from "./uc-components/paging-components/PagingComponent";

function renderPageComponent(props: any, id: string) {
  const { paging, forms } = props;
  let pagingEl = null;
  let formsEl = null;
  if (paging !== undefined) {
    pagingEl = (
      <>
        <PagingComponent key={id + "Paging"} id={id} data={paging} />
      </>
    );
  }
  if (forms?.subsection !== undefined) {
    formsEl = (
      <>
        <FormComponent key={id + "form"} id={id} data={forms} />
      </>
    );
  }
  return (
    <>
      {pagingEl}
      {formsEl}
    </>
  );
}

function getPages(id: string) {
  const pageStore = usePageStore();
  let pages: any[] = [];
  pageStore.pages.forEach((item) => {
    if (item.id !== id) return;
    pages.push(renderPageComponent(item, id));
  });
  return pages;
}

type Props = {
  id: string;
};

function PageComponent({ id }: Props) {
  const pages = getPages(id);

  return <>{pages}</>;
}

export default PageComponent;
