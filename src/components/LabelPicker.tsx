import type { Board, Column, Card } from "../types/types"
import React from "react"

const LABELS = [
    { id: "bug", name: "Bug", color: "#E85A5A" },
    { id: "feature", name: "Feature", color: "#5AE88C" },
    { id: "idea", name: "Idea", color: "#5AB7E8" },
] as const

type Props = {
    card: Card
    column: Column
    board: Board
    updateBoards: React.Dispatch<React.SetStateAction<Board[]>>
}

export default function LabelPicker({ card, column, board, updateBoards }: Props) {
    const labels = card.labels ?? []

    const toggle = (labelId: string) => {
        updateBoards((prevBoards) =>
            prevBoards.map((b) =>
                b.id !== board.id
                    ? b
                    : {
                        ...b,
                        columns: b.columns.map((c) =>
                            c.id !== column.id
                                ? c
                                : {
                                    ...c,
                                    cards: c.cards.map((k) =>
                                        k.id !== card.id
                                            ? k
                                            : {
                                                ...k,
                                                labels: k.labels?.includes(labelId) ? k.labels.filter((l) => l !== labelId) : [...(k.labels ?? []), labelId],
                                            }
                                    ),
                                }
                        ),
                    }
            )
        )
    }

    return (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {LABELS.map((l) => (
                <span
                    key={l.id}
                    className="label"
                    onClick={() => toggle(l.id)}
                    style={{
                        backgroundColor: labels.includes(l.id) ? l.color : "#444",
                        color: "#fff",
                    }}
                >
          {l.name}
        </span>
            ))}
        </div>
    )
}
