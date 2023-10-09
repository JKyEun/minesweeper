import React from 'react';
import '../style/mineSweeperWindow.scss';
import { useAppSelector } from '../store';

export default function MineSweeperWindow() {
  const PADDING = 8;
  const RECT_WIDTH = 16;
  const HEADER_HEIGHT = 16;
  const MENU_HEIGHT = 16;

  const difficulty = useAppSelector(state => state.difficulty);
  const mineArray = new Array(difficulty.width);

  return (
    <div
      style={{
        width: `${difficulty.width * RECT_WIDTH + PADDING * 4}px`,
        height: `${difficulty.height * RECT_WIDTH + PADDING * 6 + HEADER_HEIGHT + MENU_HEIGHT}px`,
      }}
      className="minesweeper-window">
      <div className="menu">
        <div className="game">Game</div>
      </div>
      <div
        style={{
          width: `${difficulty.width * RECT_WIDTH + PADDING * 2}px`,
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
          className="grid"></div>
      </div>
    </div>
  );
}
