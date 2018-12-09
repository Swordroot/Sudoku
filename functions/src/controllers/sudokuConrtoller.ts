import * as Express from 'express';
import * as sudokuService from '../services/sudokuService';

export const app = Express();

app.post('/solve', (req, res) => {
  const board: number[][] = req.body.board;
  const result = sudokuService.solve(board);
  res.json(result);
});