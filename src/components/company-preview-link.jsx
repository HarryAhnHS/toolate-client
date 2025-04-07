"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function CompanyPreviewLink({ url, title, icon = "globe" }) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case "producthunt":
        return (
          <svg
            className="h-5 w-5 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.8-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803c2.319 0 4.2 1.881 4.2 4.199 0 2.319-1.881 4.201-4.2 4.201z" />
          </svg>
        )
      default:
        return <Globe className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="px-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getIcon()}
                <span className="font-medium">{title}</span>
              </div>
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  )
} 