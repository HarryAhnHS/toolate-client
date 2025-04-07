"use client"

import { motion } from "framer-motion"
import { Github, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export const Footer = () => { 
  return (
    <motion.footer 
      className="w-full py-3 text-xs text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-muted-foreground/60">
            <Sparkles className="h-3 w-3" />
            <span>Powered by a lightweight LLM and Retrieval-Augmented Generation (RAG) engine built on real startup data from Product Hunt.</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-red-500" /> by{" "}
              <Link 
                href="https://github.com/HarryAhnHS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                HarryAhnHS
              </Link>
            </p>
            <div className="h-3 w-px bg-border"></div>
            <Link 
              href="https://github.com/HarryAhnHS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </Link>
            <div className="h-3 w-px bg-border"></div>
            <Link 
              href="https://github.com/HarryAhnHS/toolate-client" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              <span>Repository</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 