import { encodeHex, decodeHex } from "https://deno.land/std@0.216.0/encoding/hex.ts";

// now that I've wrote this, I'm realizing I could've just converted the whole string... 
export const convert = (element: string) =>
  element
    .split("")
    .map((elm) => {
      if (/[^a-zA-Z0-9 -]/g.test(elm)) {
        return "{" + encodeHex(elm) + "}";
      }
      return elm;
    })
    .join("");

export const deconvert = (element: string) => {
  let currentElm = "";
  let copying = false;
  return element
    .split("")
    .map((elm) => {
      if (copying === true) {
        currentElm += elm;
        return;
      }
      switch (elm) {
        case "{":
          copying = true;
          break;
        case "}":
          copying = false;
          return decodeHex(currentElm);
        default:
          return elm;
      }
    })
    .join("");
};

export const timeout = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const randomTimeout = async () => {
  await timeout(200 + Math.round((Math.random() * 1000)))
}