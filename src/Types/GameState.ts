import { Field } from "./Field";
import { GameStatus } from "./GameStatus";

export class GameState {
  constructor(public mineField: Field[][], public status: GameStatus) {}
}
