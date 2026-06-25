"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export default function ChatBox() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    fetchMessages()
    const channel = supabase
      .channel("messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").order("inserted_at", { ascending: true })
    if (data) setMessages(data)
  }

  async function sendMessage() {
    if (!newMessage.trim()) return
    const { data: { user } } = await supabase.auth.getUser()

    const username = user?.email || "Guest"

    await supabase.from("messages").insert([{ user_name: username, content: newMessage, lang: "en" }])
    setNewMessage("")
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 bg-white border shadow-lg rounded-lg flex flex-col">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span>Chat</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-96">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.user_name === "System" || msg.user_name === "Guest"
                    ? "bg-gray-200 text-black self-start"
                    : "bg-blue-500 text-white self-end ml-auto"
                }`}
              >
                <div className="text-xs font-semibold">{msg.user_name}</div>
                <div>{msg.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded px-2 py-1 mr-2"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
