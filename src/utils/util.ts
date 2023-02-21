import { UseFormRegister } from "react-hook-form";
import { PageType } from "../types/Type";

export function matchesEl(el: PageType, id: string) {
  return el.id === id;
}

export function toUpper(str: string) {
  if (str === "") return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}

export function generateIdentifier(str: string, addditionId: string = "") {
  return toUpper(str).replace(/\s+/g, "") + toUpper(addditionId) + "Id";
}

export function removeUndefinedProp(obj: any) {
  if (obj == undefined) return obj;
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) return;
    delete obj[key];
  });
  return obj;
}

export function transformToObjUndefined(arr: string[]) {
  const obj: Record<string, undefined> = {};
  for (const key of arr) {
    obj[key] = undefined;
  }
  return obj;
}
