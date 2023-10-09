import { DifficultyState } from '../types/types';

export const setDifficultyInLocalStorage = (difficulty: DifficultyState): void => {
  window.localStorage.setItem('DIFFICULTY', JSON.stringify(difficulty));
};

export const getDifficultyInLocalStorage = () => {
  const difficulty = JSON.parse(window.localStorage.getItem('DIFFICULTY') || '');
  return difficulty;
};
