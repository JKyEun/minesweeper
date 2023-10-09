import React, { useEffect, useState } from 'react';
import '../style/mineSweeperWindow.scss';
import { useAppDispatch, useAppSelector } from '../store';
import { EachRect } from '../types/types';
import { setMineArray } from '../store/mineArray';

export default function MineSweeperWindow() {
  const PADDING = 8;
  const RECT_WIDTH = 16;
  const HEADER_HEIGHT = 16;
  const MENU_HEIGHT = 16;

  const difficulty = useAppSelector(state => state.difficulty);
  const mineArray = useAppSelector(state => state.mineArray.mineArray);
  const dispatch = useAppDispatch();
  const [isClickedBefore, setIsClickedBefore] = useState<boolean>(false);

  const onFirstClick = (el: EachRect, colIdx: number, elIdx: number) => {
    setIsClickedBefore(true);
    const updatedMineArray = JSON.parse(JSON.stringify(mineArray));
    const updatedEl = {
      key: el.key,
      isClicked: true,
      isMine: el.isMine,
      nearMineNum: el.nearMineNum,
      isFirstClicked: true,
    };
    updatedMineArray[colIdx][elIdx] = updatedEl;

    let currentMineNum = 0;
    while (currentMineNum < difficulty.mineNum) {
      const randomRow = Math.floor(Math.random() * difficulty.width);
      const randomCol = Math.floor(Math.random() * difficulty.height);
      if (!updatedMineArray[randomRow][randomCol].isMine && !updatedMineArray[randomRow][randomCol].isFirstClicked) {
        updatedMineArray[randomRow][randomCol].isMine = true;
        const x = [-1, -1, -1, 0, 0, 1, 1, 1];
        const y = [-1, 0, 1, -1, 1, -1, 0, 1];
        for (let i = 0; i < 8; i++) {
          const newRow = randomRow + x[i];
          const newCol = randomCol + y[i];
          if (newRow >= 0 && newRow < difficulty.width && newCol >= 0 && newCol < difficulty.height) {
            updatedMineArray[newRow][newCol].nearMineNum++;
          }
        }
        currentMineNum++;
      }
    }
    dispatch(setMineArray(updatedMineArray));
  };

  const onRectClick = (el: EachRect, colIdx: number, elIdx: number) => {
    if (!isClickedBefore) return onFirstClick(el, colIdx, elIdx);

    const updatedMineArray = [...mineArray];
    const updatedEl = {
      key: el.key,
      isClicked: true,
      isMine: el.isMine,
      nearMineNum: el.nearMineNum,
      isFirstClicked: el.isFirstClicked,
    };
    updatedMineArray[colIdx] = [...updatedMineArray[colIdx]];
    updatedMineArray[colIdx][elIdx] = updatedEl;
    dispatch(setMineArray(updatedMineArray));
  };

  const setInitialMineArray = () => {
    const initialMineArray: EachRect[][] = new Array(difficulty.height).fill([]).map((_, rowIndex) =>
      new Array(difficulty.width).fill({}).map((_, colIndex) => ({
        key: `${rowIndex}-${colIndex}`,
        isClicked: false,
        isMine: false,
        nearMineNum: 0,
        isFirstClicked: false,
      }))
    );
    dispatch(setMineArray(initialMineArray));
  };

  useEffect(() => {
    setInitialMineArray();
  }, []);

  return (
    <div
      style={{
        width: `${difficulty.width * RECT_WIDTH + PADDING * 4 + 4}px`,
        height: `${difficulty.height * RECT_WIDTH + PADDING * 6 + HEADER_HEIGHT + MENU_HEIGHT}px`,
      }}
      className="minesweeper-window">
      <div className="menu">
        <div className="game">Game</div>
      </div>
      <div
        style={{
          width: `${difficulty.width * RECT_WIDTH + PADDING * 2 + 2}px`,
        }}
        className="content">
        <div className="content-header">
          <div className="mine-left">010</div>
          <div className="yellow-man">🙂</div>
          <div className="time">000</div>
        </div>
        <div
          style={{
            height: `${difficulty.height * RECT_WIDTH}px`,
          }}
          className="grid">
          {mineArray.map((col, colIdx) => (
            <div key={col[0].key} className="col">
              {col.map((el: EachRect, elIdx) =>
                el.isClicked ? (
                  el.isMine ? (
                    <div key={el.key} className="clicked-rect">
                      💣
                    </div>
                  ) : (
                    <div
                      key={el.key}
                      style={{
                        color:
                          el.nearMineNum === 1
                            ? 'blue'
                            : el.nearMineNum === 2
                            ? 'green'
                            : el.nearMineNum === 3
                            ? 'red'
                            : 'yellow',
                      }}
                      className="clicked-rect">
                      {el.nearMineNum !== 0 ? el.nearMineNum : ''}
                    </div>
                  )
                ) : (
                  <div key={el.key} onClick={() => onRectClick(el, colIdx, elIdx)} className="rect"></div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
