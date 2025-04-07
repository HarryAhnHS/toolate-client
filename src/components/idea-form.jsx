"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function IdeaForm({ onSubmit, isLoading }) {
  const [ideaText, setIdeaText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ideaText.trim()) {
      onSubmit(ideaText.trim())
    }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto p-4 md:p-8">
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
            ✨ What's your startup idea?
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              className="space-y-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Input
                placeholder="e.g., Uber for mental health"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                className="w-full text-lg"
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">Describe your startup idea in a few words</p>
            </motion.div>
            <Button 
              type="submit" 
              disabled={isLoading || !ideaText.trim()}
              className="w-full"
            >
              {isLoading ? "Analyzing..." : "Analyze Idea"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}