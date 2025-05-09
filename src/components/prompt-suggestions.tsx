
import { Button } from "@/components/ui/button";

const suggestions = [
  "Make notes on Python basics",
  "Explain Binary Search with code",
  "Summarize CNN architecture logically",
  "Notes on JavaScript promises",
  "Explain SQL joins with examples",
  "Graph theory fundamentals"
];

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="mt-4">
      <p className="text-sm mb-2 text-muted-foreground">Try these prompts:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            className="bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800 dark:hover:bg-yellow-900/40"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
