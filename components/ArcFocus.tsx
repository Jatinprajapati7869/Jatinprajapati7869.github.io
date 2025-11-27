"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { sendChatMessage } from "@/app/actions/chat"

const Icons = {
  Activity: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Zap: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Brain: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  ArrowRight: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Download: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Play: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Check: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Target: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Shield: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Sparkles: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  ChevronDown: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  BarChart3: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
  Clock: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Trophy: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
}

const AppleGradientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  )
}

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest("button, a, input, [role='button']")
      setIsHovering(!!isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="bg-white rounded-full"
        animate={{
          width: isHovering ? 48 : 16,
          height: isHovering ? 48 : 16,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </motion.div>
  )
}

// --- UI COMPONENTS ---
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const FeatureCard: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}> = ({ icon, title, description, delay = 0 }) => (
  <FadeIn delay={delay}>
    <motion.div
      className="group relative rounded-3xl p-8 md:p-10 h-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl transition-all duration-500"
      whileHover={{
        y: -8,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      {/* Gradient highlight on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 flex items-center justify-center mb-6 text-white/70 group-hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-white/50 leading-relaxed text-[15px]">{description}</p>
      </div>
    </motion.div>
  </FadeIn>
)

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <motion.div
    className="rounded-2xl p-5 flex items-center justify-between bg-white/[0.04] border border-white/[0.06] group"
    whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
  >
    <div>
      <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase mb-1">{label}</p>
      <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
    </div>
    <div className="text-white/20 group-hover:text-white/40 transition-colors">{icon}</div>
  </motion.div>
)

// --- AI CHAT INTERFACE ---
const AIChat: React.FC = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Ready to analyze your productivity patterns. Ask me anything." },
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setLoading(true)

    try {
      const response = await sendChatMessage(userMsg)
      setMessages((prev) => [...prev, { role: "model", text: response }])
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Connection interrupted. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[420px] w-full rounded-3xl overflow-hidden bg-black/40 border border-white/[0.08] backdrop-blur-2xl">
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-medium text-white/60">AI Mentor</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                m.role === "user"
                  ? "bg-white text-black font-medium"
                  : "bg-white/[0.06] border border-white/[0.06] text-white/80"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-1.5 px-4 py-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your focus patterns..."
            className="flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 bg-white/[0.04] border border-white/[0.06] focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSend}
            className="px-6 rounded-xl bg-white text-black font-semibold text-sm"
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// --- DASHBOARD PREVIEW ---
const DashboardPreview: React.FC = () => {
  const data = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]

  return (
    <div className="h-full w-full p-6 md:p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Focus Analytics</h3>
          <p className="text-sm text-white/40">Real-time performance</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Level" value="42" icon={<Icons.Trophy size={18} />} />
        <StatCard label="XP Today" value="2,840" icon={<Icons.Zap size={18} />} />
        <StatCard label="Streak" value="24d" icon={<Icons.Activity size={18} />} />
        <StatCard label="Focus" value="94%" icon={<Icons.Target size={18} />} />
      </div>

      <div className="flex-1 rounded-2xl p-5 relative overflow-hidden bg-white/[0.03] border border-white/[0.06]">
        <div className="absolute inset-0 flex items-end justify-around p-4 gap-1">
          {data.map((value, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-indigo-600/60 to-indigo-400/40"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- FAQ ---
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span
          className={`text-lg font-medium transition-colors ${isOpen ? "text-white" : "text-white/70 group-hover:text-white/90"}`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`transition-colors ${isOpen ? "text-white" : "text-white/30"}`}
        >
          <Icons.ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/50 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- NAVBAR ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4 bg-black/60 backdrop-blur-2xl border-b border-white/[0.06]" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
            <Icons.Sparkles size={18} className="text-black" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            Arc<span className="text-white/50">Focus</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/50">
          {["Features", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 bg-white text-black"
        >
          Get Started <Icons.ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.nav>
  )
}

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-24 relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="text-center max-w-5xl mx-auto relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm mb-10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Now in public beta
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] leading-[1.05] mb-8 text-balance">
            Turn focus into
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              your superpower
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-14 leading-relaxed text-pretty">
            The productivity platform that gamifies your workflow. Track focus automatically, level up daily, and unlock
            your full potential with AI-powered insights.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-3 bg-white text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            <Icons.Download size={18} /> Download for Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-3 bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-colors"
          >
            <Icons.Play size={18} /> Watch Demo
          </motion.button>
        </FadeIn>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// --- MAIN COMPONENT ---
const ArcFocus: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      <AppleGradientBackground />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />

        {/* FEATURES */}
        <section id="features" className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-20">
              <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">Features</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] mb-6 text-balance">
                Engineered for deep work
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Every feature designed to remove friction and amplify your focus.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <FeatureCard
                icon={<Icons.Target size={26} />}
                title="Passive Tracking"
                description="No timers. No manual entry. Runs silently in the background, categorizing your work patterns automatically."
                delay={0}
              />
              <FeatureCard
                icon={<Icons.Trophy size={26} />}
                title="Solo Leveling"
                description="Your productivity becomes an RPG. Gain XP for deep work, complete daily quests, and watch your character grow."
                delay={0.1}
              />
              <FeatureCard
                icon={<Icons.Shield size={26} />}
                title="Local First"
                description="Your data stays on your machine. No cloud sync required. Complete privacy by design."
                delay={0.2}
              />
              <FeatureCard
                icon={<Icons.Brain size={26} />}
                title="AI Mentor"
                description="Gemini-powered insights that analyze your patterns and suggest optimizations for better flow states."
                delay={0.3}
              />
              <FeatureCard
                icon={<Icons.BarChart3 size={26} />}
                title="Focus Analytics"
                description="Beautiful visualizations of your productivity patterns. See trends, identify bottlenecks, optimize routines."
                delay={0.4}
              />
              <FeatureCard
                icon={<Icons.Clock size={26} />}
                title="Time Heatmaps"
                description="Discover when you're most productive. Align your hardest work with your peak performance windows."
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* DASHBOARD DEMO */}
        <section className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">Dashboard</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-6 text-balance">
                  Your command center
                </h2>
                <p className="text-lg text-white/50 mb-10 leading-relaxed">
                  Track your velocity, manage quests, and monitor your progress in real-time. Everything you need,
                  beautifully organized.
                </p>
                <div className="space-y-4">
                  {["Real-time stat updates", "Daily quest generation", "Focus heatmaps", "Progress tracking"].map(
                    (item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-4 text-white/70"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <Icons.Check size={12} className="text-emerald-400" />
                        </div>
                        {item}
                      </motion.div>
                    ),
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl aspect-[4/3] shadow-[0_0_80px_-20px_rgba(99,102,241,0.3)]">
                  <DashboardPreview />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* AI DEMO */}
        <section className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn delay={0.2} className="order-2 lg:order-1">
                <AIChat />
              </FadeIn>

              <FadeIn className="order-1 lg:order-2">
                <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">AI Powered</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-6 text-balance">
                  Your AI productivity mentor
                </h2>
                <p className="text-lg text-white/50 mb-10 leading-relaxed">
                  Powered by Gemini, your AI mentor analyzes your focus patterns and provides personalized
                  recommendations to optimize your workflow.
                </p>
                <div className="space-y-4">
                  {["Pattern recognition", "Personalized tips", "Natural conversation", "Continuous learning"].map(
                    (item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-4 text-white/70"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <Icons.Check size={12} className="text-emerald-400" />
                        </div>
                        {item}
                      </motion.div>
                    ),
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-4xl">
            <FadeIn className="text-center mb-16">
              <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-6">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-white/50">Start free. Upgrade when you're ready.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              <FadeIn>
                <div className="rounded-3xl p-8 md:p-10 h-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
                  <div className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Free</div>
                  <div className="text-5xl font-semibold mb-2 tracking-tight">$0</div>
                  <p className="text-white/50 mb-8">Perfect for getting started</p>
                  <ul className="space-y-4 mb-10">
                    {["Basic tracking", "Solo leveling", "7-day history", "Daily quests"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/70">
                        <Icons.Check size={16} className="text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition-colors"
                  >
                    Get Started
                  </motion.button>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="rounded-3xl p-8 md:p-10 h-full relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl">
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/20">
                    Popular
                  </div>
                  <div className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">Pro</div>
                  <div className="text-5xl font-semibold mb-2 tracking-tight">
                    $9<span className="text-lg text-white/50 font-normal">/mo</span>
                  </div>
                  <p className="text-white/50 mb-8">For serious productivity</p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Everything in Free",
                      "AI Mentor access",
                      "Unlimited history",
                      "Advanced analytics",
                      "Priority support",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/70">
                        <Icons.Check size={16} className="text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl font-semibold bg-white text-black"
                  >
                    Start Free Trial
                  </motion.button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-3xl">
            <FadeIn className="text-center mb-16">
              <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-6">Frequently asked questions</h2>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
                <FAQItem
                  question="How does passive tracking work?"
                  answer="ArcFocus runs silently in the background, monitoring active windows and applications. It uses intelligent categorization to determine whether you're doing deep work, shallow work, or taking breaks—all without requiring any manual input."
                />
                <FAQItem
                  question="Is my data private?"
                  answer="Absolutely. ArcFocus is local-first, meaning all your productivity data stays on your machine. We never upload or sync your activity data to any server. The AI features use anonymous, aggregated insights."
                />
                <FAQItem
                  question="What platforms are supported?"
                  answer="Currently, ArcFocus is available for macOS and Windows. Linux support is on our roadmap for Q2 2025."
                />
                <FAQItem
                  question="Can I cancel my subscription anytime?"
                  answer="Yes, you can cancel your Pro subscription at any time. You'll continue to have access to Pro features until the end of your billing period."
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-40 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="rounded-3xl p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-white/[0.1] backdrop-blur-xl">
                {/* Gradient orbs */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />

                <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] mb-6 text-balance relative z-10">
                  Ready to level up your focus?
                </h2>
                <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto relative z-10">
                  Join thousands of developers, designers, and creators who've transformed their productivity with
                  ArcFocus.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-3 bg-white text-black relative z-10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  <Icons.Download size={20} /> Download for Free
                </motion.button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 border-t border-white/[0.06]">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <Icons.Sparkles size={16} className="text-black" />
              </div>
              <span className="font-semibold text-white">
                Arc<span className="text-white/50">Focus</span>
              </span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/40">
              {["Privacy", "Terms", "Twitter", "Discord"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-sm text-white/30">© 2025 ArcFocus. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default ArcFocus
