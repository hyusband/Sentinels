import { Strategy, TickerData } from "../trading/strategy.ts";
import { exchangeClient } from "../exchange/binance.ts";
import { calculateRSI } from "../trading/indicators.ts";
import { Position, RiskManager } from "../trading/riskManager.ts";

export class RsiStrategy extends Strategy {
  private priceHistory: number[] = [];
  private rsiPeriod = 14;
  private activePosition: Position | null = null;
  private riskManager = new RiskManager(0.015, 0.05);

  constructor() {
    super("RSI_Reversion", "BTCUSDT");
  }

  public async initialize(): Promise<void> {
    console.log(`Initializing ${this.name} strategy for ${this.symbol}`);

    exchangeClient.subscribeTicker(this.symbol, async (ticker) => {
      await this.onTick(ticker);
    });
  }

  public async onTick(ticker: TickerData): Promise<void> {
    this.priceHistory.push(ticker.price);

    if (this.priceHistory.length > 50) {
      this.priceHistory.shift();
    }

    if (this.activePosition) {
      const shouldClose = this.riskManager.evaluatePosition(
        this.activePosition,
        ticker.price,
      );
      if (shouldClose) {
        console.log(
          `[RSI Strategy] Closing position at ${ticker.price} to manage risk.`,
        );
        await exchangeClient.placeOrder({
          symbol: this.symbol,
          side: this.activePosition.side === "BUY" ? "SELL" : "BUY",
          type: "MARKET",
          quantity: this.activePosition.amount,
        });
        this.activePosition = null;
      }
      return;
    }

    if (this.priceHistory.length > this.rsiPeriod) {
      const rsi = calculateRSI(this.priceHistory, this.rsiPeriod);

      if (rsi < 30) {
        console.log(
          `[RSI Strategy] RSI Overbought threshold crossed. Going LONG at ${ticker.price}`,
        );
        this.activePosition = {
          id: crypto.randomUUID(),
          symbol: this.symbol,
          side: "BUY",
          entryPrice: ticker.price,
          amount: 0.1,
          stopLoss: ticker.price * 0.95,
          takeProfit: ticker.price * 1.10,
        };

        await exchangeClient.placeOrder({
          symbol: this.symbol,
          side: "BUY",
          type: "MARKET",
          quantity: 0.1,
        });
      }
    }
  }
}

export const rsiStrategy = new RsiStrategy();
