import React, { useEffect, useState } from "react"

type Props = {
    isOpen: boolean
    title: string
    placeholder?: string
    initialValue?: string
    onClose: () => void
    onSubmit: (value: string) => void
}

export default function Modal({
                                  isOpen,
                                  title,
                                  placeholder,
                                  initialValue = "",
                                  onClose,
                                  onSubmit,
                              }: Props) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        if (isOpen) setValue(initialValue ?? "")
    }, [isOpen, initialValue])

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!isOpen) return
            if (e.key === "Escape") onClose()
            if (e.key === "Enter") {
                e.preventDefault()
                onSubmit(value)
                onClose()
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, value, onClose, onSubmit])

    if (!isOpen) return null

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: 0, marginBottom: 12 }}>{title}</h3>
                <input
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="modal-input"
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={() => {
                            onSubmit(value)
                            onClose()
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
