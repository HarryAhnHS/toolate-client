"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function IdeaForm({ onSubmit, isLoading }) {
  const [ideaText, setIdeaText] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [ideaText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ideaText.trim()) {
      onSubmit(ideaText.trim())
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 bg-card border rounded-lg shadow-lg"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-4"
        >
          ✨ What's your AI startup idea?
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            className="space-y-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Write your idea here..."
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full min-h-[100px] max-h-[300px] pr-12 resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !ideaText.trim()}
                className="absolute right-2 bottom-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}