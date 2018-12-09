import * as blockIndexHelper from './blockIndexHelper';
import { IBlockRange } from '../models/blockRangeModel';

export const deleteByRule = (board: number[][] ,flags: boolean[][][], rowIndex: number, columunIndex: number, fixedNumber: number): void => {
  for (let column = 0; column < board[rowIndex].length; column++) {
    flags[rowIndex][column][fixedNumber] = false;
  }

  for (let row = 0; row < board.length; row++) {
    flags[row][columunIndex][fixedNumber] = false;
  }

  const blockRange: IBlockRange = blockIndexHelper.getBlockRange(rowIndex, columunIndex);

  for (let row = blockRange.row.start; row < blockRange.row.end; row++) {
    for (let column = blockRange.column.start; column < blockRange.column.end; column++) {
      flags[row][column][fixedNumber] = false;
    }
  }
}

export const checkFixed = (board: number[][] ,flags: boolean[][][]): boolean => {
  let changedFlag = false;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column] === -1 && flags[row][column].filter((flag: boolean) => flag).length === 1) {
        changedFlag = true;
        board[row][column] = flags[row][column].findIndex((flag: boolean) => flag);
      }
    }
  }
  return changedFlag;
}

export const checkByRule = (board: number[][] ,flags: boolean[][][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if(board[row][column] > -1){
        deleteByRule(board, flags, row, column, board[row][column]);
      }
    }
  }
  return checkFixed(board, flags);
}