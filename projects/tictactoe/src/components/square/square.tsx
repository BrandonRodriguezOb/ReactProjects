import React from 'react';

interface SquareProps {
  children?: React.ReactNode;
  updateBoard?: (index: number) => void;
  index?: number;
  isSelected?: boolean;
}

export const Square = ({ children, updateBoard, index, isSelected }: SquareProps) => {
const className = `square ${isSelected ? 'is-selected' : ''}`

const handleClick = () => {
    if (updateBoard && index !== undefined) {
        updateBoard(index);
    }
}
  return (
    <button className={className} onClick={handleClick}>{children}</button>
  )
}