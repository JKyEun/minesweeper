import React, { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { DifficultySpec } from '../types/types';
import { setDifficulty } from '../store/difficulty';
import useOutsideClick from '../hooks/useOutsideClick';

export default function MenuBar() {
  const difficulty = useAppSelector(state => state.difficulty.difficulty);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [widthInput, setWidthInput] = useState<number>(16);
  const [heightInput, setHeightInput] = useState<number>(16);
  const [mineNumInput, setMineNumInput] = useState<number>(40);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const onWidthInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidthInput(Number(e.target.value));
  };

  const onHeightInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeightInput(Number(e.target.value));
  };

  const onMineNumInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMineNumInput(Number(e.target.value));
  };

  const setCustomDifficulty = () => {
    const mineLimit = Math.floor((widthInput * heightInput) / 3);
    if (widthInput > 100 || heightInput > 100) return alert('가로, 세로는 최대 100까지 설정 가능합니다.');
    if (mineNumInput > mineLimit) return alert('지뢰 수는 격자칸 수의 1/3 이하로 설정 가능합니다.');

    const updatedDifficult = {
      difficulty: 'Custom',
      mineNum: mineNumInput,
      width: widthInput,
      height: heightInput,
    };

    setIsCustomModalOpen(false);
    dispatch(setDifficulty(updatedDifficult));
  };

  useOutsideClick(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  useOutsideClick(isCustomModalOpen, modalRef, setIsCustomModalOpen);

  return (
    <div className="menu-bar">
      <div onClick={() => setIsDropdownOpen(cur => !cur)} className="game">
        Game
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="game-dropdown">
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
          <div
            onClick={() => {
              setIsCustomModalOpen(true);
              setIsDropdownOpen(false);
            }}
            className="list-el">
            <div className="check">{difficulty === 'Custom' && '✔️'}</div>Custom
          </div>
          <hr />
          <div className="list-el">Exit</div>
        </div>
      )}
      {isCustomModalOpen && (
        <div ref={modalRef} className="custom-modal">
          <div className="title">Custom Game Setup</div>
          <div className="width">
            Width: <input onChange={onWidthInputChange} value={widthInput} type="number" />
          </div>
          <div className="height">
            Height: <input onChange={onHeightInputChange} value={heightInput} type="number" />
          </div>
          <div className="mine">
            Number of Bombs: <input onChange={onMineNumInputChange} value={mineNumInput} type="number" />
          </div>
          <div onClick={setCustomDifficulty} className="submit-btn">
            OK
          </div>
          <div onClick={() => setIsCustomModalOpen(false)} className="close-btn">
            ❌
          </div>
        </div>
      )}
    </div>
  );
}
