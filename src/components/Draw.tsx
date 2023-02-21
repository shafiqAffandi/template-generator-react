import usePageStore from "../stores/PageStore";
import Navbar from "./Navbar";
import Page from "./Page";

function Draw() {
  const store = usePageStore();

  return (
    <>
      <Navbar />
      {store.pages.map((page) => (
        <Page key={page.id} onRemove={() => store.removePage(page.id)}>
          {page}
        </Page>
        // <p className="text-white">{JSON.stringify(page)}</p>
      ))}
    </>
  );
}

export default Draw;
