"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import type { ContactItem } from "@/lib/automata-api"
import { matchesRecipientNickname } from "@/lib/korean-search"
import { cn } from "@/lib/utils"

type RecipientInputProps = {
  id: string
  value: string
  onChange: (value: string) => void
  contacts: ContactItem[]
  placeholder?: string
  className?: string
}

export function RecipientInput({
  id,
  value,
  onChange,
  contacts,
  placeholder = "이름 또는 이메일",
  className,
}: RecipientInputProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)

  const suggestions = useMemo(() => {
    const query = value.trim()
    if (!query || query.includes("@")) return []
    return contacts
      .filter((contact) => matchesRecipientNickname(contact.nickname, query))
      .slice(0, 8)
  }, [contacts, value])

  useEffect(() => {
    setHighlight(0)
    setOpen(suggestions.length > 0)
  }, [suggestions])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  const selectContact = (contact: ContactItem) => {
    onChange(contact.email)
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <Input
        id={id}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true)
        }}
        onKeyDown={(event) => {
          if (!open || suggestions.length === 0) return

          if (event.key === "ArrowDown") {
            event.preventDefault()
            setHighlight((prev) => (prev + 1) % suggestions.length)
          } else if (event.key === "ArrowUp") {
            event.preventDefault()
            setHighlight(
              (prev) => (prev - 1 + suggestions.length) % suggestions.length,
            )
          } else if (event.key === "Enter" && open) {
            event.preventDefault()
            selectContact(suggestions[highlight])
          } else if (event.key === "Escape") {
            setOpen(false)
          }
        }}
      />

      {open && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-popover py-1 text-popover-foreground shadow-md"
        >
          {suggestions.map((contact, index) => (
            <li
              key={contact.id}
              role="option"
              aria-selected={index === highlight}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm",
                index === highlight && "bg-accent text-accent-foreground",
              )}
              onMouseEnter={() => setHighlight(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectContact(contact)}
            >
              <span className="font-medium">{contact.nickname}</span>
              <span className="ml-2 text-muted-foreground">{contact.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
