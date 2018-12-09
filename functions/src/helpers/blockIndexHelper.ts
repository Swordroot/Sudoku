import { IBlockRange } from "../models/blockRangeModel";
export const getBlockRange = (rowIndex: number, columnIndex: number): IBlockRange => {
  return {
    row: {
      start: Math.floor(rowIndex / 3) * 3,
      end: (Math.floor(rowIndex / 3) + 1) * 3
    },
    column: {
      start: Math.floor(columnIndex / 3) * 3,
      end: (Math.floor(columnIndex / 3) + 1) * 3
    }
  }
}