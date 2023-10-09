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
    const updatedMineArray = mineArray;
    const updatedEl = { isClicked: el.isClicked, isMine: el.isMine, nearMineNum: el.nearMineNum, isFirstClicked: true };
    updatedMineArray[colIdx][elIdx] = updatedEl;
    dispatch(setMineArray(updatedMineArray));
  };

  const onRectClick = (el: EachRect, colIdx: number, elIdx: number) => {
    if (!isClickedBefore) onFirstClick(el, colIdx, elIdx);
  };

  const setInitialMineArray = () => {
    const initialMineArray: EachRect[][] = new Array(difficulty.height).fill(
      new Array(difficulty.width).fill({ isClicked: false, isMine: false, nearMineNum: 0, isFirstClicked: false })
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
            <div className="col">
              {col.map((el: EachRect, elIdx) =>
                el.isClicked ? (
                  el.isMine ? (
                    <div className="clicked-rect">💣</div>
                  ) : (
                    <div className="clicked-rect">{el.nearMineNum !== 0 ? el.nearMineNum : ''}</div>
                  )
                ) : (
                  <div onClick={() => onRectClick(el, colIdx, elIdx)} className="rect"></div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
