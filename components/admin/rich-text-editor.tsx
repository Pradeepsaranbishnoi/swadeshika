"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ""
    }
  }, [value])

  const exec = (cmd: string, arg?: string) => {
    document.execCommand(cmd, false, arg)
    if (ref.current) onChange(ref.current.innerHTML)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("bold")}>B</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("italic")}>I</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("underline")}>U</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("insertUnorderedList")}>• List</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("insertOrderedList")}>1. List</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("formatBlock", "<h3>")}>H3</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("formatBlock", "<p>")}>P</Button>
        <Button type="button" size="sm" variant="outline" className="border-2 border-[#E8DCC8]" onClick={() => exec("removeFormat")}>Clear</Button>
      </div>
      <div
        ref={ref}
        role="textbox"
        contentEditable
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        className="min-h-[200px] rounded-xl border-2 border-[#E8DCC8] bg-white p-3 focus:outline-none"
        data-placeholder={placeholder}
      />
    </div>
  )
}
