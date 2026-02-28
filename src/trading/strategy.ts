import { TickerData } from "../exchange/binance.ts";

export abstract class Strategy {
  public name: string;
  public symbol: string;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
  }

  public abstract onTick(ticker: TickerData): Promise<void>;
  public abstract initialize(): Promise<void>;
}
