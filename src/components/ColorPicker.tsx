import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { hexToHsva, Wheel } from "@uiw/react-color";
import { memo, useEffect, useState } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export const ColorPicker = memo(({ value, onChange, label }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const [hsva, setHsva] = useState(hexToHsva(value));

  useEffect((): void => {
    setHsva(hexToHsva(value));
  }, [value]);

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
        <PopoverContent className="w-auto p-0 bg-card/95 backdrop-blur-md border border-border z-[10001]">
          <Wheel
            color={hsva}
            onChange={(color): void => {
              setHsva(color.hsva);
              onChange(color.hex?.toUpperCase() || "");
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});
