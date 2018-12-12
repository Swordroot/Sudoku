import * as blockIndexHelper from './blockIndexHelper';
import { IBlockRange } from '../models/blockRangeModel';
interface IBlankIndex {
  row: number;
  column: number;
}

const isLast2Or3InRowAndSameBlock = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): [boolean, IBlockRange | null, IBlankIndex[] | null] => {
  const availableBlanks: IBlankIndex[] = [];
  for (let column = 0; column < board[rowIndex].length; column++) {
    if(flags[rowIndex][column][targetNumber]) {
      availableBlanks.push({
        row: rowIndex,
        column
      });
    }
  }
  if(availableBlanks.length === 2 || availableBlanks.length === 3){
    const arrayOnBlockRange: IBlockRange[] = availableBlanks.map(blockIndex => blockIndexHelper.getBlockRange(blockIndex.row, blockIndex.column));
    const flag = arrayOnBlockRange.every((br: IBlockRange) => {
      return blockIndexHelper.isSameBlock(arrayOnBlockRange[0], br);
    });
    return [flag, flag ? arrayOnBlockRange[0] : null, flag ? availableBlanks : null];
  }else {
    return [false, null, null];
  }
}

const isLast2Or3InColumnAndSameBlock = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): [boolean, IBlockRange | null, IBlankIndex[] | null] => {
  const availableBlanks: IBlankIndex[] = [];
  for (let row = 0; row < board.length; row++) {
    if(flags[row][columnIndex][targetNumber]) {
      availableBlanks.push({
        row,
        column: columnIndex
      });
    }
  }
  if(availableBlanks.length === 2 || availableBlanks.length === 3){
    const arrayOnBlockRange: IBlockRange[] = availableBlanks.map(blockIndex => blockIndexHelper.getBlockRange(blockIndex.row, blockIndex.column));
    const flag = arrayOnBlockRange.every((br: IBlockRange) => {
      return blockIndexHelper.isSameBlock(arrayOnBlockRange[0], br);
    });
    return [flag, flag ? arrayOnBlockRange[0] : null, flag ? availableBlanks : null];
  }else {
    return [false, null, null];
  }
}

const isLast2Or3InBlockAndSameRow = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): [boolean, number | null, IBlankIndex[] | null] => {
  const availableBlanks: IBlankIndex[] = [];
  const br = blockIndexHelper.getBlockRange(rowIndex, columnIndex);
  for (let row = br.row.start; row < br.row.end; row++) {
    for (let column = br.column.start; column < br.column.end; column++) {
      if (flags[row][column][targetNumber]){
        availableBlanks.push({
          row,
          column
        });
      }
    }
  }
  if(availableBlanks.length === 2 || availableBlanks.length === 3){
    const flag = availableBlanks.every((bi: IBlankIndex) => {
      return availableBlanks[0].row === bi.row;
    });
    return [flag, flag ? availableBlanks[0].row : null, flag ? availableBlanks : null];
  }else {
    return [false, null, null];
  }
}

const isLast2Or3InBlockAndSameColumn = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): [boolean, number | null, IBlankIndex[] | null] => {
  const availableBlanks: IBlankIndex[] = [];
  const br = blockIndexHelper.getBlockRange(rowIndex, columnIndex);
  for (let row = br.row.start; row < br.row.end; row++) {
    for (let column = br.column.start; column < br.column.end; column++) {
      if (flags[row][column][targetNumber]){
        availableBlanks.push({
          row,
          column
        });
      }
    }
  }
  if(availableBlanks.length === 2 || availableBlanks.length === 3){
    const flag = availableBlanks.every((bi: IBlankIndex) => {
      return availableBlanks[0].column === bi.column;
    });
    return [flag, flag ? availableBlanks[0].column : null, flag ? availableBlanks : null];
  }else {
    return [false, null, null];
  }
}

const isUpdatedByLast2Or3InRowAndSameBlock = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  const [flag, br, blanks] = isLast2Or3InRowAndSameBlock(board, flags, rowIndex, columnIndex, targetNumber);
  // console.log('isUpdatedByLast2Or3InRowAndSameBlock:[flag, br, blanks]', [flag, br, blanks]);
  if (flag) {
    for (let row = br.row.start; row < br.row.end; row++) {
      for (let column = br.column.start; column < br.column.end; column++) {
        if (blanks.every(blank => blank.row !== row || blank.column !== column)){
          flags[row][column][targetNumber] = false
        }
      }
    }
  }
  return flag;
}

const isUpdatedByLast2Or3InColumnAndSameBlock = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  const [flag, br, blanks] = isLast2Or3InColumnAndSameBlock(board, flags, rowIndex, columnIndex, targetNumber);
  // console.log('isUpdatedByLast2Or3InColumnAndSameBlock:[flag, br, blanks]', [flag, br, blanks]);
  if (flag) {
    for (let row = br.row.start; row < br.row.end; row++) {
      for (let column = br.column.start; column < br.column.end; column++) {
        if (blanks.every(blank => blank.row !== row || blank.column !== column)){
          flags[row][column][targetNumber] = false
        }
      }
    }
  }
  return flag;
}

const isUpdatedByLast2Or3InBlockAndSameRow = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  const [flag, row, blanks] = isLast2Or3InBlockAndSameRow(board, flags, rowIndex, columnIndex, targetNumber);
  // console.log('isUpdatedByLast2Or3InBlockAndSameRow:[flag, row, blanks]', [flag, row, blanks]);
  if (flag) {
    for (let column = 0; column < board[row].length; column++) {
      if (blanks.every(blank => blank.row !== row || blank.column !== column)){
        flags[row][column][targetNumber] = false
      }
    }
  }
  return flag;
}

const isUpdatedByLast2Or3InBlockAndSameColumn = (board: number[][] ,flags: boolean[][][], rowIndex: number, columnIndex: number, targetNumber: number): boolean => {
  const [flag, column, blanks] = isLast2Or3InBlockAndSameColumn(board, flags, rowIndex, columnIndex, targetNumber);
  // console.log('isUpdatedByLast2Or3InBlockAndSameColumn:[flag, column, blanks]', [flag, column, blanks]);
  if (flag) {
    for (let row = 0; row < board.length; row++) {
      if (blanks.every(blank => blank.row !== row || blank.column !== column)){
        flags[row][column][targetNumber] = false
      }
    }
  }
  return flag;
}

export const checkByLast2Or3 = (board: number[][], flags: boolean[][][]): boolean => {
  let boardChangeFlag = false;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      for (let targetNumber = 0; targetNumber < flags[row][column].length; targetNumber++) {
        if(flags[row][column][targetNumber]){
          const flag1 = isUpdatedByLast2Or3InRowAndSameBlock(board, flags, row, column, targetNumber);
          const flag2 = isUpdatedByLast2Or3InColumnAndSameBlock(board, flags, row, column, targetNumber);
          const flag3 = isUpdatedByLast2Or3InBlockAndSameRow(board, flags, row, column, targetNumber);
          const flag4 = isUpdatedByLast2Or3InBlockAndSameColumn(board, flags, row, column, targetNumber);
          boardChangeFlag = flag1 || flag2 || flag3 || flag4;
        }
      }
    }
  }
  return boardChangeFlag;
}