import React, { MouseEvent, useEffect, useState } from 'react';
import '../style/mineSweeperWindow.scss';
import { useAppDispatch, useAppSelector } from '../store';
import { EachRect } from '../types/types';
import { setMineArray } from '../store/mineArray';
import MenuBar from './MenuBar';

export default function MineSweeperWindow() {
  const PADDING = 8;
  const RECT_WIDTH = 18;
  const HEADER_HEIGHT = 16;
  const MENU_HEIGHT = 16;

  const difficulty = useAppSelector(state => state.difficulty);
  const mineArray = useAppSelector(state => state.mineArray.mineArray);
  const dispatch = useAppDispatch();
  const [isClickedBefore, setIsClickedBefore] = useState<boolean>(false);
  const [flagNum, setFlagNum] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const onFirstClick = (el: EachRect, colIdx: number, elIdx: number) => {
    setIsClickedBefore(true);
    setIsTimerActive(true);

    const updatedMineArray = JSON.parse(JSON.stringify(mineArray));
    const updatedEl = {
      key: el.key,
      isClicked: true,
      isMine: el.isMine,
      nearMineNum: el.nearMineNum,
      isFirstClicked: true,
      status: el.status,
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

    const rectsToOpen: { colIdx: number; elIdx: number }[] = [];
    const pushRectsToOpen = (colIdx: number, elIdx: number) => {
      if (
        colIdx < 0 ||
        colIdx >= difficulty.width ||
        elIdx < 0 ||
        elIdx >= difficulty.height ||
        updatedMineArray[colIdx][elIdx].isMine
      )
        return;

      const x = [-1, -1, -1, 0, 0, 1, 1, 1];
      const y = [-1, 0, 1, -1, 1, -1, 0, 1];

      for (let i = 0; i < 8; i++) {
        const newRow = colIdx + x[i];
        const newCol = elIdx + y[i];
        if (
          newRow < 0 ||
          newRow >= difficulty.width ||
          newCol < 0 ||
          newCol >= difficulty.height ||
          updatedMineArray[newRow][newCol].isMine
        )
          continue;
        let isAlreadyPushed = false;
        for (let j = 0; j < rectsToOpen.length; j++) {
          if (rectsToOpen[j].colIdx === newRow && rectsToOpen[j].elIdx === newCol) isAlreadyPushed = true;
        }
        if (!isAlreadyPushed) {
          rectsToOpen.push({ colIdx: newRow, elIdx: newCol });
          if (updatedMineArray[newRow][newCol].nearMineNum === 0) {
            console.log(newRow, newCol);
            pushRectsToOpen(newRow, newCol);
          }
        }
      }
    };
    pushRectsToOpen(colIdx, elIdx);
    for (let i = 0; i < rectsToOpen.length; i++) {
      const updatedEl = {
        key: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].key,
        isClicked: true,
        isMine: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].isMine,
        nearMineNum: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].nearMineNum,
        isFirstClicked: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].isFirstClicked,
        status: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].status,
      };
      updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx] = updatedEl;
    }

    dispatch(setMineArray(updatedMineArray));
  };

  const onRectClick = (el: EachRect, colIdx: number, elIdx: number) => {
    if (el.status === 'flag') return;
    if (!isClickedBefore) return onFirstClick(el, colIdx, elIdx);

    const updatedMineArray = JSON.parse(JSON.stringify(mineArray));
    const updatedEl = {
      key: el.key,
      isClicked: true,
      isMine: el.isMine,
      nearMineNum: el.nearMineNum,
      isFirstClicked: el.isFirstClicked,
      status: el.status,
    };
    updatedMineArray[colIdx][elIdx] = updatedEl;

    const rectsToOpen: { colIdx: number; elIdx: number }[] = [];
    const pushRectsToOpen = (colIdx: number, elIdx: number) => {
      if (
        colIdx < 0 ||
        colIdx >= difficulty.width ||
        elIdx < 0 ||
        elIdx >= difficulty.height ||
        updatedMineArray[colIdx][elIdx].isMine
      )
        return;

      const x = [-1, -1, -1, 0, 0, 1, 1, 1];
      const y = [-1, 0, 1, -1, 1, -1, 0, 1];

      for (let i = 0; i < 8; i++) {
        const newRow = colIdx + x[i];
        const newCol = elIdx + y[i];
        if (
          newRow < 0 ||
          newRow >= difficulty.width ||
          newCol < 0 ||
          newCol >= difficulty.height ||
          updatedMineArray[newRow][newCol].isMine
        )
          continue;
        let isAlreadyPushed = false;
        for (let j = 0; j < rectsToOpen.length; j++) {
          if (rectsToOpen[j].colIdx === newRow && rectsToOpen[j].elIdx === newCol) isAlreadyPushed = true;
        }
        if (!isAlreadyPushed) {
          rectsToOpen.push({ colIdx: newRow, elIdx: newCol });
          if (updatedMineArray[newRow][newCol].nearMineNum === 0) {
            console.log(newRow, newCol);
            pushRectsToOpen(newRow, newCol);
          }
        }
      }
    };
    pushRectsToOpen(colIdx, elIdx);
    for (let i = 0; i < rectsToOpen.length; i++) {
      const updatedEl = {
        key: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].key,
        isClicked: true,
        isMine: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].isMine,
        nearMineNum: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].nearMineNum,
        isFirstClicked: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].isFirstClicked,
        status: updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx].status,
      };
      updatedMineArray[rectsToOpen[i].colIdx][rectsToOpen[i].elIdx] = updatedEl;
    }

    dispatch(setMineArray(updatedMineArray));
  };

  const onRectContextMenu = (e: MouseEvent<HTMLDivElement>, el: EachRect, colIdx: number, elIdx: number) => {
    e.preventDefault();

    const updatedMineArray = JSON.parse(JSON.stringify(mineArray));
    if (el.status === '') {
      const updatedEl = {
        key: el.key,
        isClicked: el.isClicked,
        isMine: el.isMine,
        nearMineNum: el.nearMineNum,
        isFirstClicked: el.isFirstClicked,
        status: 'flag',
      };
      updatedMineArray[colIdx][elIdx] = updatedEl;
      setFlagNum(cur => cur + 1);
    } else if (el.status === 'flag') {
      const updatedEl = {
        key: el.key,
        isClicked: el.isClicked,
        isMine: el.isMine,
        nearMineNum: el.nearMineNum,
        isFirstClicked: el.isFirstClicked,
        status: 'question-mark',
      };
      updatedMineArray[colIdx][elIdx] = updatedEl;
      setFlagNum(cur => cur - 1);
    } else {
      const updatedEl = {
        key: el.key,
        isClicked: el.isClicked,
        isMine: el.isMine,
        nearMineNum: el.nearMineNum,
        isFirstClicked: el.isFirstClicked,
        status: '',
      };
      updatedMineArray[colIdx][elIdx] = updatedEl;
    }

    dispatch(setMineArray(updatedMineArray));
  };

  const setInitialMineArray = () => {
    const initialMineArray: EachRect[][] = new Array(difficulty.width).fill([]).map((_, rowIndex) =>
      new Array(difficulty.height).fill({}).map((_, colIndex) => ({
        key: `${rowIndex}-${colIndex}`,
        isClicked: false,
        isMine: false,
        nearMineNum: 0,
        isFirstClicked: false,
        status: '',
      }))
    );
    dispatch(setMineArray(initialMineArray));
  };

  const onYellowManClick = () => {
    setInitialMineArray();
    setIsTimerActive(false);
    setTime(0);
    setFlagNum(0);
    setIsClickedBefore(false);
  };

  useEffect(() => {
    setInitialMineArray();
  }, [difficulty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(cur => cur + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  return (
    <div
      style={{
        width: `${difficulty.width * RECT_WIDTH + PADDING * 4}px`,
        height: `${difficulty.height * RECT_WIDTH + PADDING * 6 + HEADER_HEIGHT + MENU_HEIGHT}px`,
      }}
      className="minesweeper-window">
      <MenuBar />
      <div
        style={{
          width: `${difficulty.width * RECT_WIDTH + PADDING * 2 - 14}px`,
        }}
        className="content">
        <div className="content-header">
          <div className="mine-left">{String(difficulty.mineNum - flagNum).padStart(3, '0')}</div>
          <div onClick={onYellowManClick} className="yellow-man">
            🙂
          </div>
          <div className="time">{time > 999 ? '999' : String(time).padStart(3, '0')}</div>
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
                  <div
                    key={el.key}
                    onClick={() => onRectClick(el, colIdx, elIdx)}
                    onContextMenu={e => onRectContextMenu(e, el, colIdx, elIdx)}
                    className="rect">
                    {el.status === 'flag' ? '⛳️' : el.status === 'question-mark' ? '❓' : ''}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
