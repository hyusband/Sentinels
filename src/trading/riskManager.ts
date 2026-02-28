export type Position = {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  entryPrice: number;
  amount: number;
  stopLoss: number;
  takeProfit?: number;
};

export class RiskManager {
  private trailingStopPercent: number;
  private maxDrawdown: number;

  constructor(trailingStopPercent: number = 0.02, maxDrawdown: number = 0.1) {
    this.trailingStopPercent = trailingStopPercent;
    this.maxDrawdown = maxDrawdown;
  }

  public evaluatePosition(position: Position, currentPrice: number): boolean {
    if (position.side === "BUY") {
      if (currentPrice <= position.stopLoss) {
        return true;
      }

      if (position.takeProfit && currentPrice >= position.takeProfit) {
        return true;
      }

      const potentialNewStop = currentPrice * (1 - this.trailingStopPercent);
      if (potentialNewStop > position.stopLoss) {
        position.stopLoss = potentialNewStop;
      }
    }

    if (position.side === "SELL") {
      if (currentPrice >= position.stopLoss) {
        return true;
      }

      if (position.takeProfit && currentPrice <= position.takeProfit) {
        return true;
      }

      const potentialNewStop = currentPrice * (1 + this.trailingStopPercent);
      if (potentialNewStop < position.stopLoss) {
        position.stopLoss = potentialNewStop;
      }
    }

    return false;
  }
}
