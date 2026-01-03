import { useState } from "react"
import "./App.css"

type Card = {
    id: string
    title: string
}

type Column = {
    id: string
    title: string
    cards: Card[]
}

function App() {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "todo",
            title: "Todo",
            cards: [],
        },
        {
            id: "doing",
            title: "Doing",
            cards: [],
        },
        {
            id: "done",
            title: "Done",
            cards: [],
        },
    ])

    const addCard = (columnId: string) => {
        const title = prompt("Card title?")
        if (!title) return

        setColumns(cols =>
            cols.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        cards: [
                            ...col.cards,
                            { id: crypto.randomUUID(), title },
                        ],
                    }
                    : col
            )
        )
    }

    const moveCard = (
        fromColumnId: string,
        toColumnId: string,
        cardId: string
    ) => {
        let movedCard: Card | null = null

        const newColumns = columns.map(col => {
            if (col.id === fromColumnId) {
                const remaining = col.cards.filter(card => {
                    if (card.id === cardId) {
                        movedCard = card
                        return false
                    }
                    return true
                })
                return { ...col, cards: remaining }
            }
            return col
        })

        if (!movedCard) return

        setColumns(
            newColumns.map(col =>
                col.id === toColumnId
                    ? { ...col, cards: [...col.cards, movedCard!] }
                    : col
            )
        )
    }

    return (
        <div className="board">
            {columns.map(col => (
                <div className="column" key={col.id}>
                    <h2>{col.title}</h2>

                    <div className="cards">
                        {col.cards.map(card => (
                            <div className="card" key={card.id}>
                                <p>{card.title}</p>

                                <div className="card-actions">
                                    {columns.map(target =>
                                        target.id !== col.id ? (
                                            <button
                                                key={target.id}
                                                onClick={() =>
                                                    moveCard(col.id, target.id, card.id)
                                                }
                                            >
                                                → {target.title}
                                            </button>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="add-card" onClick={() => addCard(col.id)}>
                        + Add card
                    </button>
                </div>
            ))}
        </div>
    )
}

export default App
