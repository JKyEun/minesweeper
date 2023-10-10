import React, { useEffect } from 'react';
import MineSweeperWindow from '../components/MineSweeperWindow';
import '../style/mainPage.scss';
import { getDifficultyInLocalStorage, setDifficultyInLocalStorage } from '../util/localStorage';
import { useAppDispatch, useAppSelector } from '../store';
import { setDifficulty } from '../store/difficulty';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(state => state.difficulty);

  useEffect(() => {
    const difficultyFromLocalStorage = getDifficultyInLocalStorage();
    if (difficultyFromLocalStorage !== '') {
      dispatch(setDifficulty(difficultyFromLocalStorage));
    } else {
      setDifficultyInLocalStorage(difficulty);
    }
  }, []);

  return (
    <div className="main-page">
      <MineSweeperWindow />
    </div>
  );
}
