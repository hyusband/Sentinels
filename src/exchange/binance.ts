import { ENV } from "../config/env.ts";

export type TickerData = {
  symbol: string;
  price: number;
  timestamp: number;
};

export type OrderRequest = {
  symbol: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  price?: number;
};

export class BinanceClient {
  private ws: WebSocket | null = null;
  private onTickerListeners: ((data: TickerData) => void)[] = [];

  constructor() {
    this.connectWs();
  }

  private connectWs() {
    this.ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "trade") {
        const ticker: TickerData = {
          symbol: data.s,
          price: parseFloat(data.p),
          timestamp: data.T,
        };
        this.emitTicker(ticker);
      }
    };

    this.ws.onclose = () => {
      console.log("Binance WS closed. Reconnecting in 5s...");
      setTimeout(() => this.connectWs(), 5000);
    };

    this.ws.onerror = (err) => {
      console.error("Binance WS Error", err);
    };
  }

  public subscribeTicker(symbol: string, callback: (data: TickerData) => void) {
    this.onTickerListeners.push(callback);
  }

  private emitTicker(data: TickerData) {
    this.onTickerListeners.forEach((listener) => listener(data));
  }

  public async placeOrder(
    order: OrderRequest,
  ): Promise<{ id: string; status: string }> {
    console.log(`Sending order request to exchange:`, order);
    return {
      id: crypto.randomUUID(),
      status: "FILLED",
    };
  }
}

export const exchangeClient = new BinanceClient();
