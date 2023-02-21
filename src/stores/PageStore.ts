import { create } from "zustand";
import {
  GridViewComponentType,
  PageType,
  PagingInputType,
  SearchComponentType,
} from "../types/Type";
import { generateIdentifier, matchesEl, toUpper } from "../utils/util";

const addPage = (pages: PageType[], page: PageType): PageType[] => [
  ...pages,
  {
    title: page.title,
    id: generateIdentifier(page.title),
    addButton: page.addButton,
    backButton: page.backButton,
    paging: page?.paging,
  },
];

const editPage = (
  pages: PageType[],
  page: PageType,
  id: string
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].title = page.title;
  pages[affectedPageIndex].addButton = page.addButton;
  pages[affectedPageIndex].backButton = page.backButton;
  return [...pages];
};

const removePage = (pages: PageType[], id: string): PageType[] => {
  return pages.filter((el) => {
    return !matchesEl(el, id);
  });
};

const addPaging = (
  pages: PageType[],
  id: string,
  comp: PagingInputType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging = comp;
  return [...pages];
};

const editPaging = (
  pages: PageType[],
  id: string,
  comp: PagingInputType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging!.pagingInput.title = comp.pagingInput.title;
  pages[affectedPageIndex].paging!.pagingInput.querystring =
    comp.pagingInput.querystring;
  pages[affectedPageIndex].paging!.pagingInput.exportExcel =
    comp.pagingInput.exportExcel;
  return [...pages];
};

const removePaging = (pages: PageType[], id: string): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  const { paging: _, ...newObj } = pages[affectedPageIndex];
  pages[affectedPageIndex] = newObj;
  return [...pages];
};

const addSearchComponent = (
  pages: PageType[],
  id: string,
  comp: SearchComponentType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  if (pages[affectedPageIndex].paging?.pagingInput?.component === undefined)
    return [...pages];
  pages[affectedPageIndex].paging?.pagingInput?.component?.push(comp);
  return [...pages];
};

const editSearchComponent = (
  pages: PageType[],
  id: string,
  idx: number,
  comp: SearchComponentType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  const updatedItems = pages[
    affectedPageIndex
  ].paging?.pagingInput.component?.map((el, index) =>
    index === idx ? comp : el
  );
  pages[affectedPageIndex].paging!.pagingInput.component = updatedItems;
  return [...pages];
};

const removeSearchComponent = (
  pages: PageType[],
  id: string,
  index: number
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging?.pagingInput.component?.splice(index, 1);
  return [...pages];
};

type Store = {
  pages: PageType[];
  newPage: PageType;
  addPage: () => void;
  editPage: (id: string) => void;
  setNewPage: (title: string, addButton: boolean, backButton: boolean) => void;
  removePage: (id: string) => void;
  addPaging: (id: string, comp: PagingInputType) => void;
  editPaging: (id: string, comp: PagingInputType) => void;
  removePaging: (id: string) => void;
  addSearchComponent: (id: string, comp: SearchComponentType) => void;
  editSearchComponent: (
    id: string,
    idx: number,
    comp: SearchComponentType
  ) => void;
  removeSearchComponent: (id: string, index: number) => void;
  // addGridViewComponent: (id: string, comp: GridViewComponentType[]) => void;
};

const usePageStore = create<Store>((set) => ({
  pages: [],
  newPage: { title: "", id: "", addButton: false, backButton: false },
  addPage: () => {
    set((state) => ({
      ...state,
      pages: addPage(state.pages, state.newPage),
      newPage: { title: "", id: "", addButton: false, backButton: false },
    }));
  },
  editPage: (id: string) => {
    set((state) => ({
      ...state,
      pages: editPage(state.pages, state.newPage, id),
    }));
  },
  setNewPage: (title: string, addButton: boolean, backButton: boolean) => {
    set((state) => ({
      ...state,
      newPage: { title, id: title, addButton, backButton },
    }));
  },
  removePage: (id: string) => {
    set((state) => ({
      ...state,
      pages: removePage(state.pages, id),
    }));
  },
  addPaging: (id: string, component: PagingInputType) => {
    set((state) => ({
      ...state,
      pages: addPaging(state.pages, id, component),
    }));
  },
  editPaging: (id: string, component: PagingInputType) => {
    set((state) => ({
      ...state,
      pages: editPaging(state.pages, id, component),
    }));
  },
  removePaging: (id: string) => {
    set((state) => ({
      ...state,
      pages: removePaging(state.pages, id),
    }));
  },
  addSearchComponent: (id: string, component: SearchComponentType) => {
    set((state) => ({
      ...state,
      pages: addSearchComponent(state.pages, id, component),
    }));
  },
  editSearchComponent: (
    id: string,
    idx: number,
    component: SearchComponentType
  ) => {
    set((state) => ({
      ...state,
      pages: editSearchComponent(state.pages, id, idx, component),
    }));
  },
  removeSearchComponent: (id: string, index: number) => {
    set((state) => ({
      ...state,
      pages: removeSearchComponent(state.pages, id, index),
    }));
  },
}));

export default usePageStore;
