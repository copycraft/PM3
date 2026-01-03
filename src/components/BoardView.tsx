import type { Board } from "../types/types"
import Column from "./Column"
import React, { useState } from "react"
import Modal from "./Modal"

type Props = {
    board: Board
    updateBoards: React.Dispatch<React.SetStateAction<Board[]>>
    goBack: () => void
}

export default function BoardView({ board, updateBoards, goBack }: Props) {
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false)

    const addCategory = (title: string) => {
        if (!title?.trim()) return
        updateBoards((prev) =>
            prev.map((b) =>
                b.id !== board.id ? b : { ...b, columns: [...b.columns, { id: crypto.randomUUID(), title: title.trim(), cards: [] }] }
            )
        )
    }

    return (
        <div style={{ width: "100%", maxWidth: 1200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button onClick={goBack}>← Back</button>
                    <h1 style={{ margin: 0 }}>{board.name}</h1>
                </div>
                <div>
                    <button onClick={() => setAddCategoryModalOpen(true)}>+ Category</button>
                </div>
            </div>

            <div className="board">
                {board.columns.map((col) => (
                    <Column key={col.id} column={col} board={board} updateBoards={updateBoards} />
                ))}
            </div>

            <Modal
                isOpen={addCategoryModalOpen}
                title="Add New Category"
                placeholder="Category name"
                onClose={() => setAddCategoryModalOpen(false)}
                onSubmit={addCategory}
            />
        </div>
    )
}
