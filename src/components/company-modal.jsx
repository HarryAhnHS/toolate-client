"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import CompanyPreviewLink from "./company-preview-link"

export default function CompanyModal({ company, onClose }) {
  if (!company) return null

  const matchPercent = Math.round(company.match_percent * 100)
  const name = company.product_meta.meta.name
  const website = company.product_meta.meta.website
  const productHuntUrl = company.product_meta.meta.url
  const tags = company.product_meta.meta.tags || []
  const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256`

  console.log(company)

  return (
    <Dialog open={!!company} onOpenChange={() => onClose()}>
      <DialogContent className="w-full sm:max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{name}</span>
            <Badge variant={getMatchVariant(company.match_percent)}>
              {matchPercent}% Match
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-auto"
              />
            </div>
            
            <div className="space-y-4">
              <CompanyPreviewLink url={website} title={'Visit website'} />
              <CompanyPreviewLink 
                url={productHuntUrl} 
                title={`View on ProductHunt`}
                icon="producthunt"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {capitalizeFirstLetter(tag)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Match Details</h3>
              <div className="space-y-4">
                {company.matches.map((match, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="font-medium capitalize mb-2">{match.type} Match</div>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{match.match_meta.standardized}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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