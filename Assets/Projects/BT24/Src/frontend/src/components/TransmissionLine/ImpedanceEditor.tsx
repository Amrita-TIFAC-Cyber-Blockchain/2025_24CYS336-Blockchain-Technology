import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// Validation schema for impedance values
const impedanceSchema = z.object({
  resistance: z.number()
    .min(0.0001, 'Resistance must be at least 0.0001 Ω')
    .max(10, 'Resistance must not exceed 10 Ω')
    .finite('Resistance must be a valid number'),
  reactance: z.number()
    .min(0.0001, 'Reactance must be at least 0.0001 Ω')
    .max(10, 'Reactance must not exceed 10 Ω')
    .finite('Reactance must be a valid number')
});

interface LineImpedance {
  id: number;
  name: string;
  fromBus: number;
  toBus: number;
  resistance: number;
  reactance: number;
}

interface ImpedanceEditorProps {
  lines: LineImpedance[];
  onUpdate: (lines: LineImpedance[]) => void;
  onReset: () => void;
}

export const ImpedanceEditor = ({ lines, onUpdate, onReset }: ImpedanceEditorProps) => {
  const handleValueChange = (lineId: number, field: 'resistance' | 'reactance', value: string) => {
    const numValue = parseFloat(value);
    
    // Validate the input value
    const result = impedanceSchema.shape[field].safeParse(numValue);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    const updatedLines = lines.map(line =>
      line.id === lineId ? { ...line, [field]: numValue } : line
    );
    onUpdate(updatedLines);
  };

  const handleSave = () => {
    toast.success('Impedance values saved successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Line Impedance Values (Z = R + jX)</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Enter resistance (R) and reactance (X) values in Ohms for each transmission line
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lines.map((line) => (
            <div key={line.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm">
                  {line.name}: Bus {line.fromBus} → Bus {line.toBus}
                </div>
                <div className="text-xs text-muted-foreground">
                  Z = {line.resistance.toFixed(4)} + j{line.reactance.toFixed(4)} Ω
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`r-${line.id}`} className="text-xs">
                    Resistance (R) in Ω
                  </Label>
                  <Input
                    id={`r-${line.id}`}
                    type="number"
                    step="0.0001"
                    min="0"
                    value={line.resistance}
                    onChange={(e) => handleValueChange(line.id, 'resistance', e.target.value)}
                    className="h-9"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`x-${line.id}`} className="text-xs">
                    Reactance (X) in Ω
                  </Label>
                  <Input
                    id={`x-${line.id}`}
                    type="number"
                    step="0.0001"
                    min="0"
                    value={line.reactance}
                    onChange={(e) => handleValueChange(line.id, 'reactance', e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};