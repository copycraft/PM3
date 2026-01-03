import type { Board, Card as CardType, Column } from "../types/types"
import LabelPicker from "./LabelPicker"
import React from "react"

type Props = {
    card: CardType
    column: Column
    board: Board
    updateBoards: React.Dispatch<React.SetStateAction<Board[]>>
}

export default function Card({ card, column, board, updateBoards }: Props) {
    return (
        <div
            className="card"
            draggable
            onDragStart={(e) =>
                e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({
                        cardId: card.id,
                        fromColumnId: column.id,
                        boardId: board.id,
                    })
                )
            }
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <strong style={{ wordBreak: "break-word" }}>{card.title}</strong>
            </div>

            <div style={{ marginTop: 8 }}>
                <LabelPicker card={card} column={column} board={board} updateBoards={updateBoards} />
            </div>
        </div>
    )
}
