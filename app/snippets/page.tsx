import { SnippetCard } from "@/components/custom/SnipperCard";

export default function SnippetsPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <SnippetCard />
      ))}
    </div>
  )
} 
