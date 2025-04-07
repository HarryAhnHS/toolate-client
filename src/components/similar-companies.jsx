"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import CompanyCard from "./company-card"
import CompanyModal from "./company-modal"

export default function SimilarCompanies({ idea, results }) {
  const [selectedCompany, setSelectedCompany] = useState(null)

  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No similar companies found.</p>
        </CardContent>
      </Card>
    )
  }

  // Sort results by match percentage in descending order
  const sortedResults = [...results].sort((a, b) => b.match_percent - a.match_percent)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Similar Companies</h2>
      
      <div className="space-y-4">
        {sortedResults.map((company, index) => (
          <CompanyCard 
            key={index} 
            company={company} 
            onClick={() => setSelectedCompany(company)}
          />
        ))}
      </div>

      <CompanyModal 
        company={selectedCompany} 
        onClose={() => setSelectedCompany(null)} 
      />
    </div>
  )
}