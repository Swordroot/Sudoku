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

export const isSameBlock = (blockRange1: IBlockRange, blockRange2: IBlockRange) => {
  return (
    blockRange1.row.start === blockRange2.row.start &&
    blockRange1.row.end === blockRange2.row.end &&
    blockRange1.column.start === blockRange2.column.start &&
    blockRange1.column.end === blockRange2.column.end 
  );
}