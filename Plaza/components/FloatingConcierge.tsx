"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** welcome messages typewriter-animate on first open */
  animate?: boolean;
}

const WELCOME_CONTENT =
  "Namaste 🙏 Welcome to Srinirvana Grand Plaza. I'm your personal AI concierge. Ask me about our rooms, pricing, amenities, dining, check-in process, or anything else about your stay.";

const QUICK_SUGGESTIONS = [
  "Room Pricing",
  "Check-in Time",
  "Amenities",
  "Book a Room",
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ─── Typewriter ─────────────────────────────────────────── */
function Typewriter({
  text,
  msPerChar = 30,
  onDone,
}: {
  text: string;
  msPerChar?: number;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, msPerChar);
      } else {
        onDone?.();
      }
    };
    const id = setTimeout(tick, msPerChar);
    return () => clearTimeout(id);
  }, [text, msPerChar, onDone]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-gold/70 align-middle ml-0.5 animate-pulse" />
      )}
    </>
  );
}

/* ─── Staggered typing dots ──────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center h-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full bg-gold/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Auto-resize textarea ───────────────────────────────── */
function AutoTextarea({
  value,
  onChange,
  onSubmit,
  disabled,
  textareaRef,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}) {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    // reset then set to scrollHeight so it grows but never shrinks below 1 row
    e.target.style.height = "auto";
    const maxH = parseInt(getComputedStyle(e.target).lineHeight) * 3 + 20;
    e.target.style.height = Math.min(e.target.scrollHeight, maxH) + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      onChange={handleInput}
      placeholder="Ask about rooms, dining, availability..."
      disabled={disabled}
      className="flex-1 bg-surface text-ivory text-sm font-sans placeholder-muted/60 px-4 py-2.5 border border-border focus:border-gold/50 focus:outline-none transition-colors duration-200 resize-none overflow-hidden leading-relaxed"
      style={{ minHeight: 42, maxHeight: 96 }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function FloatingConcierge() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_CONTENT,
      timestamp: new Date(),
      animate: true,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Appear after 3 s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new message / loading change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (open) {
      if (!hasOpened) setHasOpened(true);
      setTimeout(() => textareaRef.current?.focus(), 400);
    }
  }, [open, hasOpened]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      setShowSuggestions(false);
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      // reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      setLoading(true);

      try {
        const conversationHistory = [...messages, userMessage]
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await fetch("/api/concierge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: conversationHistory,
            userMessage: text.trim(),
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.content ||
            "I apologize, I couldn't process that. Please try again.",
          timestamp: new Date(),
          animate: true,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please call us at +91 98765 43210 for assistance.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  return (
    <>
      {/* ── Floating bubble ── */}
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            className="fixed bottom-8 right-8 z-50 w-[60px] h-[60px] rounded-full flex items-center justify-center focus:outline-none"
            style={{
              background: "linear-gradient(135deg, #C9A96E, #8B6914)",
              boxShadow: "0 4px 20px rgba(201,169,110,0.3)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Open AI Concierge"
          >
            <span
              className="absolute inset-0 rounded-full border border-gold/60 animate-[pulse-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="absolute inset-0 rounded-full border border-gold/30 animate-[pulse-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"
              style={{ animationDelay: "0.5s" }}
            />
            <MessageSquare size={22} className="text-obsidian relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            /**
             * Desktop: bottom-right panel (380×560).
             * Mobile (<768px): full-screen overlay.
             */
            className="
              fixed z-50 flex flex-col overflow-hidden shadow-2xl
              bottom-0 right-0 w-full h-full
              md:bottom-8 md:right-8 md:w-[380px] md:h-[560px] md:max-h-[calc(100dvh-100px)]
            "
            style={{
              background: "#141414",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)",
            }}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-4 border-b shrink-0"
              style={{ borderColor: "rgba(201,169,110,0.2)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #C9A96E, #8B6914)" }}
              >
                <span className="font-display text-lg text-obsidian font-medium">
                  S
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-ivory text-base font-light leading-tight">
                  Srinirvana Concierge
                </p>
                <p className="text-gold text-[10px] tracking-wider font-sans">
                  Available 24/7 · AI-Powered
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-ivory transition-colors p-1"
                aria-label="Close concierge"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex flex-col gap-1 ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm font-sans leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-tr-sm"
                          : "rounded-2xl rounded-tl-sm"
                      }`}
                      style={{
                        background: msg.role === "user" ? "#C9A96E" : "#1C1C1C",
                        color:
                          msg.role === "user" ? "#0A0A0A" : "#F5F0E8CC",
                        border:
                          msg.role === "assistant"
                            ? "1px solid #2A2A2A"
                            : "none",
                      }}
                    >
                      {/* Typewriter only for assistant messages marked animate:true */}
                      {msg.role === "assistant" && msg.animate ? (
                        <Typewriter text={msg.content} msPerChar={30} />
                      ) : (
                        msg.content
                      )}
                    </div>
                    <span
                      className="text-[10px] text-muted font-sans px-1"
                      suppressHydrationWarning
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm border border-border"
                      style={{ background: "#1C1C1C" }}
                    >
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestion chips — hidden after first user message */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  className="px-4 pb-2 flex flex-wrap gap-2 shrink-0"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 text-xs font-sans border border-gold/30 text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 rounded-sm"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div
              className="px-4 py-3 border-t shrink-0"
              style={{ borderColor: "rgba(201,169,110,0.15)" }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2 items-end"
              >
                <AutoTextarea
                  value={input}
                  onChange={setInput}
                  onSubmit={() => sendMessage(input)}
                  disabled={loading}
                  textareaRef={textareaRef}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-[42px] flex items-center justify-center bg-gold text-obsidian hover:bg-goldLight transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
