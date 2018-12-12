import * as blockIndexHelper from './blockIndexHelper';
import * as byRuleHelper from './byRuleHelper';
import { IBlockRange } from '../models/blockRangeModel';
import { IBackTrackKouho } from '../models/backTrackKouhoModel';

const isLastOneInRow = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  return flags[rowIndex].map((rowFlags: boolean[]): boolean => rowFlags[targetNumber]).filter(elem => elem).length === 1;
}

const isLastOneInColumn = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  return flags.map((rowFlags: boolean[][]): boolean => rowFlags[columnIndex][targetNumber]).filter(elem => elem).length === 1;
}

const isLastOneInBlock = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  const br: IBlockRange = blockIndexHelper.getBlockRange(rowIndex, columnIndex);
  let counter = 0;
  for (let row = br.row.start; row < br.row.end; row++) {
    for (let column = br.column.start; column < br.column.end; column++) {
      if(flags[row][column][targetNumber]){
        counter++;
      }
    }
  }
  return counter === 1;
}

export const checkByLastOne = (board: number[][] ,flags: boolean[][][]): boolean => {
  let boardChangeFlag = false;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      for (let targetNumber = 0; targetNumber < flags[row][column].length; targetNumber++) {
        const isLastOne = flags[row][column][targetNumber] && 
                          (isLastOneInRow(board, flags, row, column, targetNumber) || 
                          isLastOneInColumn(board, flags, row, column, targetNumber) || 
                          isLastOneInBlock(board, flags, row, column, targetNumber));
        if (isLastOne) {
          board[row][column] = targetNumber;
          boardChangeFlag = true;
          byRuleHelper.deleteByRule(board, flags, row, column, targetNumber);
          break;
        }
      }
    }
  }
  return boardChangeFlag;
}