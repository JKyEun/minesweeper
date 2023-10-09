export type DifficultyState = {
  difficulty: string;
  mineNum: number;
  width: number;
  height: number;
};

export type EachRect = {
  key: string;
  isClicked: boolean;
  isMine: boolean;
  nearMineNum: number;
  isFirstClicked: boolean;
};

export type MineArrayState = {
  mineArray: EachRect[][];
};
