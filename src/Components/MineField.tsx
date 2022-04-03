import { Field } from "../Types/Field";
import { GameState } from "../Types/GameState";
import { GameSquare } from "./GameSquare";

export const MineField = (props: MineFieldProps) => {
  const mineField = props.gameState.mineField;
  const numRows = mineField.length;
  const numCols = mineField[0].length;

  return (
    <div className="game-outer-container">
      <div
        style={{
          border: "4px solid darkblue",
          borderRadius: "10px",
          margin: "0 auto",
          display: "grid",
          height: "auto",
          width: `${numCols * 40}px`,
          gridTemplate: `repeat(${numRows},1fr) / repeat(${numCols},1fr)`,
        }}
      >
        {mineField.map((row, i) => {
          return row.map((field, j) => (
            <GameSquare
              key={`${i}-${j}`}
              index={j + row.length}
              field={field}
              onLeftClick={(field) => props.onLeftClick(field)}
              onRightClick={(field) => props.onRightClick(field)}
              onDoubleClick={(field) => props.onDoubleClick(field)}
            />
          ));
        })}
      </div>
    </div>
  );
};

export interface MineFieldProps {
  gameState: GameState;
  onLeftClick: (square: Field) => void;
  onRightClick: (square: Field) => void;
  onDoubleClick: (square: Field) => void;
}
