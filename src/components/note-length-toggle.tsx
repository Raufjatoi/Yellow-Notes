
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NoteLengthToggleProps {
  isDetailed: boolean;
  onChange: (isDetailed: boolean) => void;
}

export function NoteLengthToggle({ isDetailed, onChange }: NoteLengthToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Switch
          id="length-toggle"
          checked={isDetailed}
          onCheckedChange={onChange}
        />
        <Label htmlFor="length-toggle" className="text-sm">
          {isDetailed ? "Detailed Notes" : "Concise Notes"}
        </Label>
      </div>
      <span className="text-xs text-muted-foreground">
        {isDetailed ? "Comprehensive content" : "Brief summary"}
      </span>
    </div>
  );
}
