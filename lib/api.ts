export const craft = async (one: string, two: string): Promise<GameRes> => {
  const res = await fetch(
    `https://neal.fun/api/infinite-craft/pair?first=${one}&second=${two}`,
    { method: "GET" }
  );
	return await res.json()
}

export interface GameRes {
  result: string;
  emoji: string;
  isNew: boolean;
}
