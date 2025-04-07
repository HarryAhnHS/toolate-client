"use client"

import { motion } from "framer-motion"
import IdeaForm from "@/components/idea-form"
import { Sparkles, Lightbulb, Search, TrendingUp } from "lucide-react"

export default function IdeaPage({ onSubmit, isLoading }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-20 text-foreground">
      <motion.div 
        className="w-full max-w-5xl mx-auto space-y-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-xl">
              <Sparkles className="h-8 w-8" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Validate Your AI Startup Instantly
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-lg rounded-full"></div>
            <p className="relative text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 py-2">
              Paste your idea. TooLate.ai will find similar startups, surface what makes you different, and suggest improvements — all using AI.
            </p>
          </motion.div>
        </section>


        {/* Idea Submission Form */}
        <section>
            <IdeaForm onSubmit={onSubmit} isLoading={isLoading} />
        </section>

      </motion.div>
    </div>
  )
}