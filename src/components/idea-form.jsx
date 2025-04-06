"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function IdeaForm({ onSubmit, isLoading }) {
  const [ideaText, setIdeaText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ideaText.trim()) {
      onSubmit(ideaText.trim())
    }
  }

  return (
    <div className="p-6 bg-card border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Enter Your Startup Idea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="e.g., Uber for mental health"
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            className="w-full"
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">Describe your startup idea in a few words</p>
        </div>
        <Button type="submit" disabled={isLoading || !ideaText.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Idea"
          )}
        </Button>
      </form>
    </div>
  )
}