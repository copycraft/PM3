import type { Board, Column as ColType, Card as CardType } from "../types/types"
import Card from "./Card"
import React, { useState } from "react"
import Modal from "./Modal"

type Props = {
    column: ColType
    board: Board
    updateBoards: React.Dispatch<React.SetStateAction<Board[]>>
}

export default function Column({ column, board, updateBoards }: Props) {
    const [addCardModalOpen, setAddCardModalOpen] = useState(false)
    const [renameModalOpen, setRenameModalOpen] = useState(false)

    const addCard = (title: string) => {
        if (!title?.trim()) return
        const newCard: CardType = { id: crypto.randomUUID(), title: title.trim(), labels: [] }
        updateBoards((prev) =>
            prev.map((b) =>
                b.id !== board.id ? b : { ...b, columns: b.columns.map((c) => (c.id !== column.id ? c : { ...c, cards: [...c.cards, newCard] })) }
            )
        )
    }

    const renameColumn = (newName: string) => {
        if (!newName?.trim()) return
        updateBoards((prev) =>
            prev.map((b) => (b.id !== board.id ? b : { ...b, columns: b.columns.map((c) => (c.id === column.id ? { ...c, title: newName.trim() } : c)) }))
        )
    }

    const deleteColumn = () => {
        if (!confirm(`Delete category "${column.title}"?`)) return
        updateBoards((prev) => prev.map((b) => (b.id !== board.id ? b : { ...b, columns: b.columns.filter((c) => c.id !== column.id) })))
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        try {
            const data = JSON.parse(e.dataTransfer.getData("text/plain"))
            if (data.boardId !== board.id) return
            updateBoards((prev) =>
                prev.map((b) =>
                    b.id !== board.id
                        ? b
                        : {
                            ...b,
                            columns: b.columns.map((c) => {
                                if (c.id === data.fromColumnId) return { ...c, cards: c.cards.filter((k) => k.id !== data.cardId) }
                                if (c.id === column.id) {
                                    const cardToMove = b.columns.find((col) => col.id === data.fromColumnId)?.cards.find((k) => k.id === data.cardId)
                                    return cardToMove ? { ...c, cards: [...c.cards, cardToMove] } : c
                                }
                                return c
                            }),
                        }
                )
            )
        } catch {
            // ignore bad data
        }
    }

    return (
        <div className="column" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <h2 onDoubleClick={() => setRenameModalOpen(true)} style={{ cursor: "pointer" }}>
                    {column.title}
                </h2>
                <button onClick={deleteColumn}>✕</button>
            </div>

            <div className="cards" style={{ width: "100%" }}>
                {column.cards.map((card) => (
                    <Card key={card.id} card={card} column={column} board={board} updateBoards={updateBoards} />
                ))}
            </div>

            <button className="add-card" onClick={() => setAddCardModalOpen(true)}>
                + Card
            </button>

            <Modal isOpen={addCardModalOpen} title="Add Card" placeholder="Card title" onClose={() => setAddCardModalOpen(false)} onSubmit={addCard} />
            <Modal isOpen={renameModalOpen} title="Rename Category" placeholder="New category name" initialValue={column.title} onClose={() => setRenameModalOpen(false)} onSubmit={renameColumn} />
        </div>
    )
}
