"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Send, Info } from "lucide-react"

export default function IdeaForm({ onSubmit, isLoading }) {
  const [ideaText, setIdeaText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [ideaText])

  useEffect(() => {
    // Count words (split by whitespace and filter out empty strings)
    const words = ideaText.trim().split(/\s+/).filter(word => word.length > 0)
    const count = words.length
    setWordCount(count)
    setIsValid(count >= 5)
  }, [ideaText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(ideaText.trim())
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isValid) {
        handleSubmit(e)
      }
    }
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 md:p-8 rounded-2xl backdrop-blur-xl"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
        >
          ✨ What's your AI startup idea?
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <motion.div 
            className="space-y-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Write your idea here... be as detailed as possible"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full min-h-[100px] max-h-[300px] pr-10 sm:pr-12 resize-none text-sm sm:text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !isValid}
                className="absolute right-2 bottom-2 h-8 w-8 sm:h-9 sm:w-9"
              >
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm">
              <span className={`${isValid ? 'text-green-500' : 'text-muted-foreground'}`}>
                (Min 5 words) {isValid ? '✓' : ''}
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">More words and details will help us find better matches</span>
                <span className="sm:hidden">More details = better matches</span>
              </span>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}