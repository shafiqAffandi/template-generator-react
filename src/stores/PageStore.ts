import { create } from "zustand";
import {
  GridViewComponentType,
  PageType,
  PagingInputType,
  SearchComponentType,
} from "../types/Type";

const toUpper = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
};

const addPage = (pages: PageType[], page: PageType): PageType[] => [
  ...pages,
  {
    title: page.title,
    id: toUpper(page.title).replace(/\s+/g, "") + "Id",
    addButton: page.addButton,
    hideButton: page.hideButton,
    paging: page?.paging,
  },
];

function matchesEl(el: PageType, id: string) {
  return el.id === id;
}

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
  const affectedPage = pages.filter((el) => matchesEl(el, id));
  affectedPage[0].paging = comp;
  const _page = { ...affectedPage[0] };
  return Object.assign(pages, _page);
};

const addSearchComponent = (
  pages: PageType[],
  id: string,
  comp: SearchComponentType[]
): PageType[] => {
  const affectedPage = pages.filter((el) => matchesEl(el, id));
  if (affectedPage[0].paging?.pagingInput.component === undefined)
    return [...pages];
  affectedPage[0].paging.pagingInput.component = comp;
  const _page = { ...affectedPage[0] };
  return Object.assign(pages, _page);
};

type Store = {
  pages: PageType[];
  newPage: PageType;
  addPage: () => void;
  setNewPage: (title: string, addButton: boolean, hideButton: boolean) => void;
  removePage: (id: string) => void;
  addPaging: (id: string, comp: PagingInputType) => void;
  addSearchComponent: (id: string, comp: SearchComponentType[]) => void;
  // addGridViewComponent: (id: string, comp: GridViewComponentType[]) => void;
};

const usePageStore = create<Store>((set) => ({
  pages: [],
  newPage: { title: "", id: "", addButton: false, hideButton: false },
  addPage: () => {
    set((state) => ({
      ...state,
      pages: addPage(state.pages, state.newPage),
      newPage: { title: "", id: "", addButton: false, hideButton: false },
    }));
  },
  setNewPage: (title: string, addButton: boolean, hideButton: boolean) => {
    set((state) => ({
      ...state,
      newPage: { title, id: title, addButton, hideButton },
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
  addSearchComponent: (id: string, component: SearchComponentType[]) => {
    set((state) => ({
      ...state,
      pages: addSearchComponent(state.pages, id, component),
    }));
  },
}));

export default usePageStore;
