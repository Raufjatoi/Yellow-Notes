
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NoteType = "theory" | "code" | "logic";

interface NoteTypeSelectorProps {
  selectedType: NoteType;
  onChange: (type: NoteType) => void;
}

export function NoteTypeSelector({ selectedType, onChange }: NoteTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        onClick={() => onChange("theory")}
        className={cn(
          "flex-1 min-w-[100px]",
          selectedType === "theory" 
            ? "bg-yellow-300 text-yellow-950 hover:bg-yellow-400" 
            : "bg-secondary hover:bg-secondary/80"
        )}
        variant={selectedType === "theory" ? "default" : "outline"}
      >
        📖 Theory
      </Button>
      
      <Button
        onClick={() => onChange("code")}
        className={cn(
          "flex-1 min-w-[100px]",
          selectedType === "code" 
            ? "bg-yellow-300 text-yellow-950 hover:bg-yellow-400" 
            : "bg-secondary hover:bg-secondary/80"
        )}
        variant={selectedType === "code" ? "default" : "outline"}
      >
        💻 Code
      </Button>
      
      <Button
        onClick={() => onChange("logic")}
        className={cn(
          "flex-1 min-w-[100px]",
          selectedType === "logic" 
            ? "bg-yellow-300 text-yellow-950 hover:bg-yellow-400" 
            : "bg-secondary hover:bg-secondary/80"
        )}
        variant={selectedType === "logic" ? "default" : "outline"}
      >
        🧠 Logic
      </Button>
    </div>
  );
}
