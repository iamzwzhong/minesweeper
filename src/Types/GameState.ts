import { Field } from "./Field";

export class GameState {
  constructor(public mineField: Field[][], public completed: boolean) {}
}
