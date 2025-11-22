import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  label: string;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type: "text" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: string;
  min?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export const FormField = (props: FormFieldProps) => {
  const { label, className, type, value, onChange, placeholder } = props;

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-foreground">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1 resize-none"
          rows={(props as TextareaFieldProps).rows || 3}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1"
          step={(props as InputFieldProps).step}
          min={(props as InputFieldProps).min}
        />
      )}
    </div>
  );
};
