import { Point } from "./Point";

export class Field {
  constructor(
    public position: Point,
    public isOpened = false,
    public isMine = false,
    public numMines = 0,
    public isFlagged = false
  ) {}
}
