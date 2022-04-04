import { Field } from "../Types/Field";
import mineIcon from "../Assets/Icons/mine.png";
import flagIcon from "../Assets/Icons/flag.png";

let timer = setInterval(() => {});

export const GameSquare = (props: SquareProps) => {
  return renderField(
    props.field,
    props.onLeftClick,
    props.onRightClick,
    props.onDoubleClick
  );
};

function renderField(
  field: Field,
  onLeftClick: (square: Field) => void,
  onRightClick: (square: Field) => void,
  onDoubleClick: (square: Field) => void
) {
  if (field.isOpened) {
    if (field.isMine) {
      if (field.numMines === -1)
        return <img src={mineIcon} className="game-square-detonated" alt="" />;
      else return <img src={mineIcon} className="game-square-mine" alt="" />;
    } else {
      return (
        <button
          onClick={(e) => {
            clearTimeout(timer);
            if (e.detail === 1) {
              timer = setTimeout(() => {}, 200);
            } else if (e.detail === 2) {
              onDoubleClick(field);
            }
          }}
          className={`game-square-opened mines-${field.numMines}`}
        >
          {field.numMines > 0 ? field.numMines : ""}
        </button>
      );
    }
  } else {
    if (field.isFlagged) {
      return (
        <img
          alt=""
          src={flagIcon}
          className="game-square-flagged"
          onContextMenu={(e) => {
            e.preventDefault();
            onRightClick(field);
          }}
        />
      );
    } else {
      return (
        <button
          className="game-square-unopened"
          onClick={() => onLeftClick(field)}
          onContextMenu={(e) => {
            e.preventDefault();
            onRightClick(field);
          }}
        ></button>
      );
    }
  }
}

export interface SquareProps {
  index: number;
  field: Field;
  onLeftClick: (square: Field) => void;
  onRightClick: (field: Field) => void;
  onDoubleClick: (field: Field) => void;
}
