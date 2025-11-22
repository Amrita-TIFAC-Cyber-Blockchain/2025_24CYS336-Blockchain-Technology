import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  sender: string;
  receiver: string;
  amountInKwh: number;
  timestamp: number;
}

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionCard({ transaction, className }: TransactionCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className={cn(
      "bg-gradient-card border border-border/50 transition-smooth hover:border-energy-trading/50",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatTime(transaction.timestamp)}
          </div>
          <Badge variant="outline" className="text-xs bg-gradient-trading text-primary-foreground border-0">
            {transaction.amountInKwh} kWh
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <div className="font-mono text-energy-generation">
              {formatAddress(transaction.sender)}
            </div>
            <div className="text-xs text-muted-foreground">Seller</div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-energy-trading animate-pulse" />
          
          <div className="text-sm">
            <div className="font-mono text-energy-consumption">
              {formatAddress(transaction.receiver)}
            </div>
            <div className="text-xs text-muted-foreground">Buyer</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}