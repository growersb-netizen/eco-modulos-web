'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageSquare, Loader2 } from 'lucide-react'

// ── Tipos ────────────────────────────────────────────────────────────────────
interface Message {
  id: string
  text: string
  from: 'user' | 'agent'
  time: string
  agent?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function timeStr() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

function makeMsg(text: string, from: 'user' | 'agent', agent?: string): Message {
  return { id: uuid(), text, from, time: timeStr(), agent }
}

const SESSION_KEY = 'eco_chat_session'
const WELCOME = '¡Hola! Soy Valentina, asesora de Eco Módulos & Piscinas. 😊\n¿Buscás una piscina, un módulo habitacional, o querés saber más sobre la financiación?'

// ── Componente ────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [badge, setBadge] = useState(false)
  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') return uuid()
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) return stored
    const id = uuid()
    sessionStorage.setItem(SESSION_KEY, id)
    return id
  })
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const welcomeShown = useRef(false)

  // Scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, waiting])

  // Badge de invitación a los 4 segundos
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setBadge(true) }, 4000)
    return () => clearTimeout(t)
  }, [open])

  // Mensaje de bienvenida cuando se abre por primera vez
  useEffect(() => {
    if (open && !welcomeShown.current) {
      welcomeShown.current = true
      setTimeout(() => {
        setMessages([makeMsg(WELCOME, 'agent', 'Valentina')])
        inputRef.current?.focus()
      }, 400)
    }
    if (open) {
      setBadge(false)
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [open])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || waiting) return

    setMessages((prev) => [...prev, makeMsg(text, 'user')])
    setInput('')
    setWaiting(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          makeMsg(data.reply || '…', 'agent', data.agent || 'Valentina'),
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          makeMsg('Disculpá, tuve un inconveniente técnico. Podés escribirnos por WhatsApp. 🙏', 'agent'),
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        makeMsg('Disculpá, no pude conectarme. Por favor escribinos por WhatsApp. 🙏', 'agent'),
      ])
    } finally {
      setWaiting(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [input, waiting, sessionId])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Formatear texto con saltos de línea
  function formatText(text: string) {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {/* ── Ventana de chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[370px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)', height: '520px' }}
            role="dialog"
            aria-label="Chat con Valentina"
          >
            {/* Header */}
            <div className="bg-[#111] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-eco-green/20 border border-eco-green/40 flex items-center justify-center text-xl">
                  🌿
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Valentina</p>
                <p className="text-[#6b7280] text-xs">Asesora · En línea ahora</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#6b7280] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#2a2a2a]"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a transparent' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.from === 'agent' && msg.agent && (
                    <span className="text-[10px] text-[#6b7280] px-1">{msg.agent}</span>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-eco-green text-white rounded-tr-sm'
                        : 'bg-[#252525] text-[#f5f5f5] rounded-tl-sm'
                    }`}
                  >
                    {formatText(msg.text)}
                  </div>
                  <span className="text-[10px] text-[#4b5563] px-1">{msg.time}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {waiting && (
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] text-[#6b7280] px-1">Valentina</span>
                  <div className="bg-[#252525] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 150, 300].map((delay) => (
                        <motion.span
                          key={delay}
                          className="w-2 h-2 bg-[#6b7280] rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: delay / 1000 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#2a2a2a] px-3 py-3 flex items-end gap-2 flex-shrink-0 bg-[#111]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
                }}
                onKeyDown={handleKey}
                placeholder="Escribí tu consulta…"
                disabled={waiting}
                rows={1}
                className="flex-1 bg-[#252525] border border-[#333] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b7280] resize-none focus:outline-none focus:border-eco-green transition-colors disabled:opacity-60"
                style={{ maxHeight: '96px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || waiting}
                className="flex-shrink-0 w-10 h-10 bg-eco-green hover:bg-eco-green-light disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors"
                aria-label="Enviar"
              >
                {waiting
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />
                }
              </button>
            </div>

            {/* Footer */}
            <div className="bg-[#0d0d0d] px-4 py-1.5 text-center flex-shrink-0">
              <p className="text-[10px] text-[#374151]">Eco Módulos & Piscinas · Asistente IA</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botón flotante ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-24 z-50"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar chat' : 'Chatear con Valentina'}
          className="relative flex items-center justify-center w-14 h-14 bg-eco-green hover:bg-eco-green-light text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageSquare className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Badge de notificación */}
          <AnimatePresence>
            {badge && !open && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Tooltip */}
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none hidden sm:block"
          >
            💬 Chatear con Valentina
            <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#1a1a1a] border-y-[4px] border-y-transparent" />
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
