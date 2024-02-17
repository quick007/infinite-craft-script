import { convert } from "./utils.ts";

export const kv = await Deno.openKv();

export const saveElement = async (data: Element) => {
  await kv.set(["elements", convert(data.text)], data);
};

export const getElement = async (name: string) => {
  return await kv.get<Element>(["elements", convert(name)]);
};

export const saveRecipe = async (name: string, data: Recipe[][]) => {
  await kv.set(["recipes", convert(name)], data);
};

export const getRecipe = async (name: string) => {
  return await kv.get<Recipe[][]>(["recipes", convert(name)]);
};

export interface Element {
  text: string;
  emoji: string;
  discovered: boolean;
}

export interface Recipe {
  text: string;
  emoji: string;
}