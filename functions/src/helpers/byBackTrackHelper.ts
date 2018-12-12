import * as blockIndexHelper from './blockIndexHelper';
import { IBlockRange } from '../models/blockRangeModel';
import { IBackTrackKouho } from '../models/backTrackKouhoModel';

const convertFlagsToKouho = (board: number[][], flags: boolean[][][]): IBackTrackKouho[] => {
  const kouhoArray: IBackTrackKouho[] = [];
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column] < 0){
        kouhoArray.push({
          nums: flags[row][column].map((elem: boolean, index: number) => {
            return elem ? index : -1;
          }).filter(elem => elem > -1),
          row,
          column
        });
      }
    }
    
  }
  return kouhoArray;
}

const isValidRow = (board: number[][], rowIndex: number, columnIndex: number): boolean => {
  const counter = [0,0,0,0,0,0,0,0,0];
  board[rowIndex].forEach(element => {
    if(element > -1) {
      counter[element]++;
    }
  });
  return counter.findIndex(element => element > 1) < 0;
}

const isValidColumn = (board: number[][], rowIndex: number, columnIndex: number): boolean => {
  const counter = [0,0,0,0,0,0,0,0,0];
  board.map(row => row[columnIndex]).forEach(element => {
    if(element > -1) {
      counter[element]++;
    }
  });
  return counter.findIndex(element => element > 1) < 0;
}

const isValidBlock = (board: number[][], rowIndex: number, columnIndex: number): boolean => {
  const counter = [0,0,0,0,0,0,0,0,0];
  const br: IBlockRange = blockIndexHelper.getBlockRange(rowIndex, columnIndex);
  for (let row = br.row.start; row < br.row.end; row++) {
    for (let column = br.column.start; column < br.column.end; column++) {
      counter[board[row][column]]++;
    }
    
  }
  return counter.findIndex(element => element > 1) < 0;
}

const recursiveBackTrack = (board: number[][], backTrackKouho: IBackTrackKouho[], btKouhoIndex: number): boolean => {
  const currentKouho = backTrackKouho[btKouhoIndex]
  for (const num of currentKouho.nums) {
    board[currentKouho.row][currentKouho.column] = num;

    if(isValidRow(board, currentKouho.row, currentKouho.column) && 
       isValidColumn(board, currentKouho.row, currentKouho.column) &&
       isValidBlock(board, currentKouho.row, currentKouho.column)){
      if(btKouhoIndex + 1 >= backTrackKouho.length) {
        return true;
      }else{
        if(recursiveBackTrack(board, backTrackKouho, btKouhoIndex + 1)){
          return true;
        }
      }
    }
  }
  board[currentKouho.row][currentKouho.column] = -1;
  return false;
}

export const backTrack = (board: number[][], flags: boolean[][][]): boolean => {
  const backTrackKouho: IBackTrackKouho[] = convertFlagsToKouho(board, flags);
  console.log('候補:', backTrackKouho);
  return recursiveBackTrack(board, backTrackKouho, 0);
}