import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { memo, useState } from "react";

const colorPalette = [
  "#ef4444", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981",
  "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6",
  "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b", "#475569"
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export const ColorPicker = memo(({ value, onChange, label }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-12 border-2"
            style={{ backgroundColor: value }}
          >
            <span className="text-white drop-shadow-md font-medium">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-card/95 backdrop-blur-md border border-border z-[10001]">
          <div className="grid grid-cols-6 gap-2">
            {colorPalette.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-md border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(color);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
