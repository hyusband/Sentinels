# Sentinels Trading Bot

Sentinels is a highly modular, TypeScript-based automated trading bot built on [Deno](https://deno.land/) and optimized for deployment on [Railway](https://railway.app/). It uses Discord as the primary and sole interface for managing strategies, executing manual trades, and reviewing system performance.

## Architecture

![Architecture](https://via.placeholder.com/800x400?text=Sentinels+Architecture)

The architecture revolves around several key layers:
1. **Discordeno Interface (`src/discord/`)**: The presentation layer. Maps slash commands to inner engine functionality.
2. **Strategy Engine (`src/trading/`)**: Modular architecture where custom technical indicator-based strategies (like RSI, MACD) are deployed.
3. **Exchange Layer (`src/exchange/`)**: Abstracts away specific broker endpoints (Binance by default) behind a unified, event-driven interface using WebSockets for real-time `aggTrade` data.
4. **Data Persistence (`src/db/`)**: Relational storage using `postgres.js` to back testing metrics, trade histories, and strategy configurations on Railway PostgreSQL.

## Technologies Used
* **Runtime**: Deno v1.x + TypeScript v5.x
* **Bot Framework**: [Discordeno](https://deno.land/x/discordeno)
* **Database**: PostgreSQL
* **Infrastructure**: Docker & Railway

---

## 🚀 Deployment to Railway

This project is configured out-of-the-box for Railway.

### 1. Provision a PostgreSQL Database
1. Go to your Railway dashboard.
2. Click **New Project** -> **Provision PostgreSQL**.
3. Under the Database variables, locate your `DATABASE_URL`.

### 2. Deploy the Deno Application
1. Within the same Railway project, click **New Service** -> **GitHub Repo** (and select your fork/clone of Sentinels).
2. The provided `railway.json` and `Dockerfile` will automatically handle building and caching Deno dependencies.

### 3. Environment Variables
In your Railway dashboard for the Sentinels service, navigate to **Variables** and set the following:
* `DISCORD_TOKEN`: Your Discord Bot token (from the Developer Portal).
* `DATABASE_URL`: Add a Reference to your Railway PostgreSQL service (`${{Postgres.DATABASE_URL}}`).
* `BINANCE_API_KEY`: (Optional) For automated real-trade execution.
* `BINANCE_API_SECRET`: (Optional) For automated real-trade execution.

### 4. Cold Starts and State Persistence
The provided `Dockerfile` leverages `deno cache` in early build stages, minimizing bootup times. Once the container is running:
* **Database Schema Initiation**: On first startup, `src/db/connection.ts` safely validates schemas.
* **Auto-Reconnects**: Built-in exchange WebSocket logic handles disconnects cleanly without dropping state.

---

## 🛠 Features Breakdown

### WebSockets & Event-Driven Tickers
Sentinels does not rely on heavy polling. It connects directly to generic WebSockets (e.g. `wss://stream.binance.com:9443`) and broadcasts ticks downstream to initialized strategies.

### Discord Slash Commands
Interact directly via Discord using the following provided commands:
* `/config [strategy] [status]`: Activate or configure a module.
* `/monitor`: Gain a pulse-check on market activity and active portfolio.
* `/trade [symbol] [side] [amount]`: Push manual bypass orders straight to the exchange.
* `/risk`: Administer trailing stop percentages.

### Risk Management Engine
Incorporated directly via `src/trading/riskManager.ts`, providing:
* Evaluated dynamic trailing Stops (`trailingStopPercent`).
* Hard Stop Losses on invalidation zones.

## Local Development

1. Ensure Deno is installed on your local machine.
2. Create a `.env` file in the project root mirroring the required environment variables.
3. Run the application:
```bash
deno task dev
```
4. Or thoroughly typecheck without execution:
```bash
deno check src/mod.ts
```
