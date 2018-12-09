import * as Express from 'express';
import * as cors from 'cors';
import * as sudokuService from '../services/sudokuService';

export const app = Express();
app.use(cors({ origin: true }));

app.post('/solve', (req, res) => {
  const board: number[][] = req.body.board;
  const shifted: number[][] = board.map((row: number[]) => row.map((value: number) => value - 1));
  console.log(shifted);
  const result = sudokuService.solve(shifted);
  res.json(result);
});