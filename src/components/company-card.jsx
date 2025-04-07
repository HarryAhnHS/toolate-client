"use client"

import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CompanyCard({ company, onClick }) {
  const matchPercent = Math.round(company.match_percent * 100)
  const name = company.product_meta.meta.name
  const tags = company.product_meta.meta.tags || []
  
  // Generate a placeholder image based on the company name
  const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div 
        className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-semibold text-lg truncate">{name}</h3>
              <Badge variant={getMatchVariant(company.match_percent)}>
                {matchPercent}% Match
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {capitalizeFirstLetter(tag)}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  )
}

function getMatchVariant(matchPercent) {
  if (matchPercent >= 0.7) return "destructive"
  if (matchPercent >= 0.4) return "warning"
  return "secondary"
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
} 