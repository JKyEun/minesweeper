import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { DifficultySpec } from '../types/types';
import { setDifficulty } from '../store/difficulty';

const DIFFICULTY_SPEC: DifficultySpec = {
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
} as const;

interface MenuDropdownProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCustomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuDropdown({ dropdownRef, setIsDropdownOpen, setIsCustomModalOpen }: MenuDropdownProps) {
  const dispatch = useAppDispatch();

  const difficulty = useAppSelector(state => state.difficulty.difficulty);

  const onDifficultyClick = (diff: string) => {
    const updatedDifficult = DIFFICULTY_SPEC[diff];
    setIsDropdownOpen(false);
    dispatch(setDifficulty(updatedDifficult));
  };

  return (
    <div ref={dropdownRef} className="game-dropdown">
      <div className="list-el">New</div>
      <hr />
      <div onClick={() => onDifficultyClick(DIFFICULTY_SPEC.Beginner.difficulty)} className="list-el">
        <div className="check">{difficulty === DIFFICULTY_SPEC.Beginner.difficulty && '✔️'}</div>
        Beginner
      </div>
      <div onClick={() => onDifficultyClick(DIFFICULTY_SPEC.Intermediate.difficulty)} className="list-el">
        <div className="check">{difficulty === DIFFICULTY_SPEC.Intermediate.difficulty && '✔️'}</div>Intermediate
      </div>
      <div onClick={() => onDifficultyClick(DIFFICULTY_SPEC.Expert.difficulty)} className="list-el">
        <div className="check">{difficulty === DIFFICULTY_SPEC.Expert.difficulty && '✔️'}</div>Expert
      </div>
      <div
        onClick={() => {
          setIsCustomModalOpen(true);
          setIsDropdownOpen(false);
        }}
        className="list-el">
        <div className="check">{difficulty === 'Custom' && '✔️'}</div>Custom
      </div>
    </div>
  );
}
