import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../store';
import { setDifficulty } from '../store/difficulty';

interface CustomDifficultyModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  setIsCustomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;
const DEFAULT_MINE_NUM = 40;

export default function CustomDifficultyModal({ modalRef, setIsCustomModalOpen }: CustomDifficultyModalProps) {
  const dispatch = useAppDispatch();

  const [widthInput, setWidthInput] = useState<number>(DEFAULT_WIDTH);
  const [heightInput, setHeightInput] = useState<number>(DEFAULT_HEIGHT);
  const [mineNumInput, setMineNumInput] = useState<number>(DEFAULT_MINE_NUM);

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

  return (
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
  );
}
