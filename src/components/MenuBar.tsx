import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { DifficultySpec } from '../types/types';
import { setDifficulty } from '../store/difficulty';

export default function MenuBar() {
  const difficulty = useAppSelector(state => state.difficulty.difficulty);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const difficultySpec: DifficultySpec = {
    Beginner: {
      difficulty: 'Beginner',
      mineNum: 10,
      width: 8,
      height: 8,
    },
    Intermediate: {
      difficulty: 'Intermediate',
      mineNum: 40,
      width: 16,
      height: 16,
    },
    Expert: {
      difficulty: 'Expert',
      mineNum: 100,
      width: 32,
      height: 16,
    },
  };

  const onDifficultyClick = (diff: string) => {
    const updatedDifficult = difficultySpec[diff];
    setIsDropdownOpen(false);
    dispatch(setDifficulty(updatedDifficult));
  };

  return (
    <div className="menu-bar">
      <div onClick={() => setIsDropdownOpen(cur => !cur)} className="game">
        Game
      </div>
      {isDropdownOpen && (
        <div className="game-dropdown">
          <div className="list-el">New</div>
          <hr />
          <div onClick={() => onDifficultyClick('Beginner')} className="list-el">
            <div className="check">{difficulty === 'Beginner' && '✔️'}</div>
            Beginner
          </div>
          <div onClick={() => onDifficultyClick('Intermediate')} className="list-el">
            <div className="check">{difficulty === 'Intermediate' && '✔️'}</div>Intermediate
          </div>
          <div onClick={() => onDifficultyClick('Expert')} className="list-el">
            <div className="check">{difficulty === 'Expert' && '✔️'}</div>Expert
          </div>
          <div className="list-el">
            <div className="check">{difficulty === 'Custom' && '✔️'}</div>Custom
          </div>
          <hr />
          <div className="list-el">Exit</div>
        </div>
      )}
    </div>
  );
}
