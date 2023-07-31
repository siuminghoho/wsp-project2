export type Memo = {
  id: string;
  content: string;
  image?: string;
};

export type LikeMemo = {
  userId: number;
  memos: Memo[];
};
