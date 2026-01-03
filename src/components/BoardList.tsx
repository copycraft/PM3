import type { Board } from "../types/types"
import React, { useState } from "react"
import Modal from "./Modal"

export default function BoardList({
                                      boards,
                                      setBoards,
                                      open,
                                  }: {
    boards: Board[]
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>
    open: (id: string) => void
}) {
    const [modalOpen, setModalOpen] = useState(false)

    const createBoard = (name: string) => {
        if (!name?.trim()) return
        setBoards((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: name.trim(),
                columns: [
                    { id: "todo", title: "Todo", cards: [] },
                    { id: "doing", title: "Doing", cards: [] },
                    { id: "done", title: "Done", cards: [] },
                ],
            },
        ])
    }

    return (
        <div className="board-list centered-block">
            <h1>Boards</h1>

            <div className="board-list-grid">
                {boards.map((b) => (
                    <button key={b.id} onClick={() => open(b.id)} className="board-tile">
                        {b.name}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 12 }}>
                <button onClick={() => setModalOpen(true)}>+ New Board</button>
            </div>

            <Modal
                isOpen={modalOpen}
                title="Create New Board"
                placeholder="Board name"
                onClose={() => setModalOpen(false)}
                onSubmit={createBoard}
            />
        </div>
    )
}
