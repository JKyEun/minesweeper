import React, { useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import MenuCustomDifficultyModal from './MenuCustomDifficultyModal';
import MenuDropdown from './MenuDropdown';

export default function MenuBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  useOutsideClick(isCustomModalOpen, modalRef, setIsCustomModalOpen);

  return (
    <div className="menu-bar">
      <div onClick={() => setIsDropdownOpen(cur => !cur)} className="game">
        Game
      </div>
      {isDropdownOpen && (
        <MenuDropdown
          dropdownRef={dropdownRef}
          setIsDropdownOpen={setIsDropdownOpen}
          setIsCustomModalOpen={setIsCustomModalOpen}
        />
      )}
      {isCustomModalOpen && (
        <MenuCustomDifficultyModal modalRef={modalRef} setIsCustomModalOpen={setIsCustomModalOpen} />
      )}
    </div>
  );
}
