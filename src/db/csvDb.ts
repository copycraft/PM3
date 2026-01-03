import type { Board } from "../types/types"

const KEY = "trello_csv_db"

export function loadBoards(): Board[] {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
}

export function saveBoards(boards: Board[]) {
    localStorage.setItem(KEY, JSON.stringify(boards))
}

// returns an unsubscribe function
export function subscribe(callback: (boards: Board[]) => void) {
    const handler = (e: StorageEvent) => {
        if (e.key === KEY && e.newValue) {
            try {
                const parsed = JSON.parse(e.newValue)
                callback(parsed)
            } catch {
                // ignore parse errors
            }
        }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
}
