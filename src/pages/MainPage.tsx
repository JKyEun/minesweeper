import React from 'react';
import MineSweeperWindow from '../components/MineSweeperWindow';
import '../style/mainPage.scss';
import { getDifficultyInLocalStorage } from '../util/localStorage';
import { useAppDispatch } from '../store';
import { setDifficulty } from '../store/difficulty';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const difficultyFromLocalStorage = getDifficultyInLocalStorage();
  if (difficultyFromLocalStorage !== '') dispatch(setDifficulty(difficultyFromLocalStorage));

  return (
    <div className="main-page">
      <MineSweeperWindow />
    </div>
  );
}
