import { craft } from "./lib/api.ts";
import { Element, kv, saveElement } from "./lib/kv.ts";
import { getElement } from "./lib/kv.ts";
import { randomTimeout, deconvert, convert } from "./lib/utils.ts";

const started = await getElement("Fire");
const defaults = [
  {
    text: "Water",
    emoji: "💧",
    discovered: false,
  },
  {
    text: "Fire",
    emoji: "🔥",
    discovered: false,
  },
  {
    text: "Wind",
    emoji: "🌬️",
    discovered: false,
  },
  {
    text: "Earth",
    emoji: "🌍",
    discovered: false,
  },
];

if (!started) {
  for (const d of defaults) {
    await saveElement(d);
  }
}

// this section is incredibly jank

let firstCursor = "";
const initialelement = kv.list<Element>({ prefix: ["elements"] }, { limit: 1 });

// this has to be wrong
for await (const element of initialelement) {console.log(element)}
 firstCursor = initialelement.cursor;

// reminds me of all those callback hell examples...
for (let i = 0; i < 1; i++) {
	console.log("started")
  const elements = kv.list<Element>(
    { prefix: ["elements"] },
    //{ cursor: firstCursor }
  );
  for await (const element of elements) {
		console.log("helo")
    await randomTimeout();
    const name = deconvert(element.value.text);
    const moreElements = kv.list<Element>(
      { prefix: ["elements"] },
      { limit: 1 }
    );
    for await (const elms of moreElements) {
      await randomTimeout();
      const nametwo = deconvert(elms.value.text);
      const craftRes = await craft(name, nametwo);
      // commonly it'll just return the same element as the one inputted
      if (craftRes.result !== name && craftRes.result !== nametwo) {
        const crafted = await getElement(craftRes.result);
        if (!crafted) {
          console.log(
            "New element found:",
            craftRes.result,
            craftRes.isNew && "NEWWWWWW!!!!!!!!!!!!!!"
          );
          await saveElement({
            discovered: craftRes.isNew,
            emoji: craftRes.emoji,
            text: craftRes.result,
          });
        } else {
					console.log("already found...")
				}
      }
    }
  }
}

// to-do: save recipies, do deconverting in kv.ts
