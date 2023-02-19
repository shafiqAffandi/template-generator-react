import { create } from "zustand";
import { PageType } from "../types/PageType";

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

type Store = {
  pages: PageType[];
  newPage: PageType;
  addPage: () => void;
  setNewPage: (title: string, addButton: boolean, hideButton: boolean) => void;
  removePage: (id: string) => void;
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
}));

export default usePageStore;
