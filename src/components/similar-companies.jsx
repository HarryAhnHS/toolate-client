import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export default function SimilarCompanies  ({ idea, results }) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No similar companies found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We couldn't find any companies similar to your idea.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Similar Companies</span>
          <Badge variant="outline" className="ml-2">
            {results.length} found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((company, index) => (
          <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{company.product_meta.meta.name}</h3>
                <a
                  href={company.product_meta.meta.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 dark:text-blue-400 flex items-center hover:underline"
                >
                  {company.product_meta.meta.website}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="text-right">
                <Badge variant={getMatchVariant(company.match_percent)} className="ml-2">
                  {Math.round(company.match_percent * 100)}% Match
                </Badge>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {company.matches.map((match, idx) => (
                <div key={idx} className="text-sm">
                  <div className="font-medium capitalize mb-1">{match.type} Match</div>
                  <div className="p-2 bg-muted rounded text-xs">{match.match_meta.standardized}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {company.product_meta.meta.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function getMatchVariant(matchPercent) {
  if (matchPercent >= 0.7) return "destructive"
  if (matchPercent >= 0.4) return "warning"
  return "secondary"
}