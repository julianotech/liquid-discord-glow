import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo, useState } from "react";

const availableIcons = [
  "ShoppingCart", "Coffee", "Utensils", "Home", "Car", "Bus", "Plane",
  "Bike", "Heart", "Gamepad", "Music", "Book", "GraduationCap", "Briefcase",
  "DollarSign", "TrendingUp", "Gift", "Smartphone", "Laptop", "Tv",
  "Shirt", "Baby", "Dog", "Cat", "Pill", "Dumbbell", "Pizza", "Wine",
  "Cigarette", "Fuel", "Zap", "Droplet", "Flame", "Snowflake", "Sun"
] as const;

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  iconColor?: string;
  bgColor?: string;
}

export const IconPicker = memo(({ value, onChange, iconColor = "#ffffff", bgColor = "#3b82f6" }: IconPickerProps) => {
  const [open, setOpen] = useState(false);

  const IconComponent = (Icons as any)[value] || Icons.HelpCircle;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-16 h-16 p-0 border-2"
          style={{ backgroundColor: bgColor }}
        >
          <IconComponent size={32} style={{ color: iconColor }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3 bg-card/95 backdrop-blur-md border border-border z-[10001]">
        <ScrollArea className="h-64">
          <div className="grid grid-cols-5 gap-2">
            {availableIcons.map((iconName) => {
              const Icon = (Icons as any)[iconName];
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  className="w-12 h-12 p-0 hover:bg-accent hover:ring-2 hover:ring-primary transition-all duration-200"
                  onClick={(): void => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                >
                  <Icon size={24} className="text-foreground" />
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
});
