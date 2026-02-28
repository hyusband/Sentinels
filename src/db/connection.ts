import { Client } from "../../deps.ts";
import { ENV } from "../config/env.ts";

export const client = new Client(ENV.DATABASE_URL);

export async function initDb() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database.");

    await createSchemas();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

async function createSchemas() {
  await client.queryArray(`
    CREATE TABLE IF NOT EXISTS strategies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL UNIQUE,
      symbol VARCHAR(20) NOT NULL,
      status VARCHAR(20) DEFAULT 'INACTIVE',
      parameters JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.queryArray(`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      strategy_id UUID REFERENCES strategies(id),
      symbol VARCHAR(20) NOT NULL,
      side VARCHAR(10) NOT NULL, -- BUY, SELL
      type VARCHAR(20) NOT NULL, -- MARKET, LIMIT
      amount DECIMAL NOT NULL,
      price DECIMAL NOT NULL,
      status VARCHAR(20) DEFAULT 'OPEN', -- OPEN, CLOSED, CANCELLED
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database schemas verified.");
}
