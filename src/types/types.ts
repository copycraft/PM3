export type Label = {
    id: string
    name: string
    color: string
}

export type Card = {
    id: string
    title: string
    labels: string[]
    tags?: string[]
}

export type Column = {
    id: string
    title: string
    cards: Card[]
}

export type Board = {
    id: string
    name: string
    columns: Column[]
}
