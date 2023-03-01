import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ActionPagingType } from "../types/ActionPagingType";
import {
  BodyPagingType,
  CriteriaPaging,
  HeaderPagingType,
  PageType,
  PagingInputType,
  SearchComponentType,
} from "../types/Type";
import { matchesEl, toUpper } from "../utils/utils";

const LOCAL_KEY = "page_template";

const addPage = (pages: PageType[], page: PageType): PageType[] => [
  ...pages,
  {
    title: page.title,
    id: toUpper(page.title).replace(/\s+/g, ""),
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

const addHeaderPaging = (
  pages: PageType[],
  id: string,
  comp: HeaderPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  if (pages[affectedPageIndex].paging?.pagingInput?.headerList === undefined)
    return [...pages];
  pages[affectedPageIndex].paging?.pagingInput?.headerList?.push(comp);
  return [...pages];
};

const editHeaderPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  comp: HeaderPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  const updatedItems = pages[
    affectedPageIndex
  ].paging?.pagingInput.headerList?.map((el, index) =>
    index === idx ? comp : el
  );
  pages[affectedPageIndex].paging!.pagingInput.headerList = updatedItems;
  return [...pages];
};

const removeHeaderPaging = (
  pages: PageType[],
  id: string,
  index: number
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging?.pagingInput.headerList?.splice(index, 1);
  return [...pages];
};

const addBodyPaging = (
  pages: PageType[],
  id: string,
  comp: BodyPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  if (pages[affectedPageIndex].paging?.pagingInput?.bodyList === undefined)
    return [...pages];
  pages[affectedPageIndex].paging?.pagingInput?.bodyList?.push(comp);
  return [...pages];
};

const editBodyPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  comp: BodyPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  const updatedItems = pages[
    affectedPageIndex
  ].paging?.pagingInput.bodyList?.map((el, index) =>
    index === idx ? comp : el
  );
  pages[affectedPageIndex].paging!.pagingInput.bodyList = updatedItems;
  return [...pages];
};

const removeBodyPaging = (
  pages: PageType[],
  id: string,
  index: number
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging?.pagingInput.bodyList?.splice(index, 1);
  return [...pages];
};

const addActionBodyPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  comp: ActionPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging!.pagingInput.bodyList![idx].action!.push(
    comp
  );
  return [...pages];
};

const editActionBodyPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  actionIdx: number,
  comp: ActionPagingType
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging!.pagingInput.bodyList![idx].action![
    actionIdx
  ] = comp;
  return [...pages];
};

const removeActionBodyPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  actionIdx: number
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging?.pagingInput.bodyList![idx].action!.splice(
    actionIdx,
    1
  );
  return [...pages];
};

const addCriteriaPaging = (
  pages: PageType[],
  id: string,
  criteria: CriteriaPaging
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  if (pages[affectedPageIndex].paging?.criteria === undefined)
    return [...pages];
  pages[affectedPageIndex].paging?.criteria?.push(criteria);
  return [...pages];
};

const editCriteriaPaging = (
  pages: PageType[],
  id: string,
  idx: number,
  criteria: CriteriaPaging
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  const updatedItems = pages[affectedPageIndex].paging?.criteria?.map(
    (el, index) => (index === idx ? criteria : el)
  );
  pages[affectedPageIndex].paging!.criteria = updatedItems;
  return [...pages];
};

const removeCriteriaPaging = (
  pages: PageType[],
  id: string,
  index: number
): PageType[] => {
  const affectedPageIndex = pages.findIndex((el) => matchesEl(el, id));
  pages[affectedPageIndex].paging?.criteria?.splice(index, 1);
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
  addHeaderPaging: (id: string, comp: HeaderPagingType) => void;
  editHeaderPaging: (id: string, idx: number, comp: HeaderPagingType) => void;
  removeHeaderPaging: (id: string, index: number) => void;
  addBodyPaging: (id: string, comp: BodyPagingType) => void;
  editBodyPaging: (id: string, idx: number, comp: BodyPagingType) => void;
  removeBodyPaging: (id: string, index: number) => void;
  addActionBodyPaging: (
    id: string,
    index: number,
    component: ActionPagingType
  ) => void;
  editActionBodyPaging: (
    id: string,
    index: number,
    actionIndex: number,
    component: ActionPagingType
  ) => void;
  removeActionBodyPaging: (
    id: string,
    index: number,
    actionIndex: number
  ) => void;
  addCriteriaPaging: (id: string, criteria: CriteriaPaging) => void;
  editCriteriaPaging: (
    id: string,
    idx: number,
    criteria: CriteriaPaging
  ) => void;
  removeCriteriaPaging: (id: string, index: number) => void;
};

const usePageStore = create<Store>()(
  persist(
    (set) => ({
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
      addHeaderPaging: (id: string, component: HeaderPagingType) => {
        set((state) => ({
          ...state,
          pages: addHeaderPaging(state.pages, id, component),
        }));
      },
      editHeaderPaging: (
        id: string,
        idx: number,
        component: HeaderPagingType
      ) => {
        set((state) => ({
          ...state,
          pages: editHeaderPaging(state.pages, id, idx, component),
        }));
      },
      removeHeaderPaging: (id: string, index: number) => {
        set((state) => ({
          ...state,
          pages: removeHeaderPaging(state.pages, id, index),
        }));
      },
      addBodyPaging: (id: string, component: BodyPagingType) => {
        set((state) => ({
          ...state,
          pages: addBodyPaging(state.pages, id, component),
        }));
      },
      editBodyPaging: (id: string, idx: number, component: BodyPagingType) => {
        set((state) => ({
          ...state,
          pages: editBodyPaging(state.pages, id, idx, component),
        }));
      },
      removeBodyPaging: (id: string, index: number) => {
        set((state) => ({
          ...state,
          pages: removeBodyPaging(state.pages, id, index),
        }));
      },
      addActionBodyPaging: (
        id: string,
        index: number,
        component: ActionPagingType
      ) => {
        set((state) => ({
          ...state,
          pages: addActionBodyPaging(state.pages, id, index, component),
        }));
      },
      editActionBodyPaging: (
        id: string,
        index: number,
        actionIndex: number,
        component: ActionPagingType
      ) => {
        set((state) => ({
          ...state,
          pages: editActionBodyPaging(
            state.pages,
            id,
            index,
            actionIndex,
            component
          ),
        }));
      },
      removeActionBodyPaging: (
        id: string,
        index: number,
        actionIndex: number
      ) => {
        set((state) => ({
          ...state,
          pages: removeActionBodyPaging(state.pages, id, index, actionIndex),
        }));
      },
      addCriteriaPaging: (id: string, criteria: CriteriaPaging) => {
        set((state) => ({
          ...state,
          pages: addCriteriaPaging(state.pages, id, criteria),
        }));
      },
      editCriteriaPaging: (
        id: string,
        idx: number,
        criteria: CriteriaPaging
      ) => {
        set((state) => ({
          ...state,
          pages: editCriteriaPaging(state.pages, id, idx, criteria),
        }));
      },
      removeCriteriaPaging: (id: string, index: number) => {
        set((state) => ({
          ...state,
          pages: removeCriteriaPaging(state.pages, id, index),
        }));
      },
    }),
    { name: LOCAL_KEY, storage: createJSONStorage(() => localStorage) }
  )
);

export default usePageStore;
