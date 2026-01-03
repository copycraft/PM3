import { useEffect, useState } from "react"
import type { Board } from "./types/types"
import { loadBoards, saveBoards, subscribe } from "./db/csvDb"
import BoardList from "./components/BoardList"
import BoardView from "./components/BoardView"
import "./styles/board.css"

export default function App() {
    const [boards, setBoards] = useState<Board[]>(() => {
        const stored = loadBoards()
        return stored.length
            ? stored
            : [
                {
                    id: crypto.randomUUID(),
                    name: "Demo Board",
                    columns: [
                        { id: "todo", title: "Todo", cards: [] },
                        { id: "doing", title: "Doing", cards: [] },
                        { id: "done", title: "Done", cards: [] },
                    ],
                },
            ]
    })

    const [activeBoard, setActiveBoard] = useState<string | null>(null)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => saveBoards(boards), [boards])
    useEffect(() => {
        const unsubscribe = subscribe(setBoards)
        return unsubscribe
    }, [])

    const currentBoard = activeBoard ? boards.find((b) => b.id === activeBoard) : null

    if (activeBoard && !currentBoard) {
        return (
            <div className="app-center">
                <p>Board not found.</p>
                <button onClick={() => setActiveBoard(null)}>Go back</button>
            </div>
        )
    }

    return (
        <div className="app-center">
            <header className="app-header">
                <h1>Copicraft</h1>
                <span className="time">{currentTime.toLocaleTimeString()}</span>
            </header>

            <main className="app-main">
                {currentBoard ? (
                    <BoardView board={currentBoard} updateBoards={setBoards} goBack={() => setActiveBoard(null)} />
                ) : (
                    <BoardList boards={boards} setBoards={setBoards} open={setActiveBoard} />
                )}
            </main>

            <footer className="app-footer">Made with 💖 by Copicraft • {new Date().getFullYear()}</footer>
        </div>
    )
}
