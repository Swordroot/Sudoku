import * as byRuleHelper from '../helpers/byRuleHelper';
import { IResponse } from '../models/responseModel';

export const solve = (board: number[][]): IResponse => {
  const flags: boolean[][][] = [];
  for (let i = 0; i < board.length; i++) {
    flags.push([]);
    for (let j = 0; j < board[i].length; j++) {
      if(board[i][j] > -1){
        const flags_ = [false,false,false,false,false,false,false,false,false];
        flags_[board[i][j]] = true;
        flags[i].push(flags_);
      } else {
        flags[i].push([true,true,true,true,true,true,true,true,true]);
      }
      
    }
  }
  console.log(flags);
  let boardChangedFlag = false;
  do {
    boardChangedFlag = false;
    if (byRuleHelper.checkByRule(board, flags)) {
      boardChangedFlag = true;
      continue;
    }
  } while (boardChangedFlag)

  return {
    board,
    flags
  }
}