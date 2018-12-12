import * as byRuleHelper from '../helpers/byRuleHelper';
import * as byLastOneHelper from '../helpers/byLastOneHelper';
import * as byLast2Or3Helper from '../helpers/byLast2Or3InSameAreaHelper';
import * as byBackTrackHelper from '../helpers/byBackTrackHelper';
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
  let boardChangedFlag = false;
  do {
    boardChangedFlag = false;
    if (byRuleHelper.checkByRule(board, flags)) {
      boardChangedFlag = true;
      continue;
    }

    if (byLastOneHelper.checkByLastOne(board, flags)) {
      boardChangedFlag = true;
      continue;
    }

    if (byLast2Or3Helper.checkByLast2Or3(board, flags)) {
      boardChangedFlag = true;
      continue;
    }
  } while (boardChangedFlag)

  byBackTrackHelper.backTrack(board, flags);

  return {
    board,
    flags
  }
}