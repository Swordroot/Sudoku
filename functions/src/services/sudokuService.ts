import * as byRuleHelper from '../helpers/byRuleHelper';
import { IResponse } from '../models/responseModel';

export const solve = (board: number[][]): IResponse => {
  const flags: boolean[][][] = new Array<Array<Array<boolean>>>(9).map(
    (value2d: boolean[][]): boolean[][] => new Array<Array<boolean>>(9).map(
      (value1d: boolean[]): boolean[] => new Array<boolean>(9).map(
        (value: boolean): boolean => false
      )
    )
  );
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