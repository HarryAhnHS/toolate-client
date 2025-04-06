import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Fingerprint, ArrowRight } from "lucide-react"

export default function AnalysisReport({ analysis }) {
  if (!analysis) return null

  console.log(analysis.uniqueness_score)
  const uniquenessScore = Number.parseInt(analysis.uniqueness_score, 10)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Analysis Report</span>
          <Badge variant={getUniquenessVariant(uniquenessScore)} className="ml-2">
            {uniquenessScore}% Unique
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 font-medium flex items-center">
            <Fingerprint className="mr-2 h-4 w-4" />
            Uniqueness Score
          </div>
          <Progress value={uniquenessScore} className="h-2" />
        </div>

        <div className="space-y-4">
          <AnalysisSection
            title="Similarities"
            content={analysis.similarities}
            icon={<ArrowRight className="h-4 w-4" />}
          />

          <AnalysisSection
            title="Differences"
            content={analysis.differences}
            icon={<ArrowRight className="h-4 w-4" />}
          />

          <AnalysisSection
            title="Suggestions"
            content={analysis.suggestions}
            icon={<Lightbulb className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function AnalysisSection({ title, content, icon }) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-medium mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <p className="text-sm text-muted-foreground whitespace-pre-line">{content}</p>
    </div>
  )
}

function getUniquenessVariant(score) {
  if (score >= 70) return "success"
  if (score >= 40) return "warning"
  return "destructive"
}

