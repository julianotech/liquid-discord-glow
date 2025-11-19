import { Card } from "./ui/card";

export const InfoCard = ({ text, value }: { text: string, value: string | number }): JSX.Element => {
  return (
    <Card className="bg-card rounded-lg border border-border shadow-md p-6">
      <p className="text-muted-foreground text-sm mb-2">{text}</p>
      <p className="text-3xl font-bold text-foreground">R$ {value}</p>
    </Card>
  );
};