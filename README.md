# Food Delivery Backend

A NestJS microservices backend for processing food orders through kitchen and rider workflows.

## Architecture

```text
Client -> Orders Service -> RabbitMQ -> Kitchen Service -> RabbitMQ -> Rider Service
				 |                              |                         |
			 orders DB                     kitchen DB                rider DB
```

- **Orders Service**: HTTP API on `http://localhost:3000`; creates orders and publishes `order_created`.
- **Kitchen Service**: consumes `order_created`, stores a kitchen ticket, then publishes `order_ready`.
- **Rider Service**: consumes `order_ready`, assigns a rider, and stores a dispatch.
- **RabbitMQ**: provides `kitchen_queue` and `rider_queue` for asynchronous communication.
- **PostgreSQL**: accessed through Neon and Drizzle ORM.

## Requirements

- Node.js
- pnpm
- Docker Desktop
- A PostgreSQL/Neon database URL for each service

## Setup

Install dependencies in each service:

```powershell
cd orders-service; pnpm install
cd ..\kitchen-service; pnpm install
cd ..\rider-service; pnpm install
```

Create a `.env` file in each service directory:

```env
DATABASE_URL=your_postgresql_connection_string
```

Start RabbitMQ:

```powershell
docker compose up -d
```

Apply database migrations from each service directory:

```powershell
cd orders-service; pnpm db:migrate
cd ..\kitchen-service; pnpm db:migrate
cd ..\rider-service; pnpm db:migrate
```

## Run Locally

Open three terminals and run:

```powershell
cd orders-service; pnpm start:dev
```

```powershell
cd kitchen-service; pnpm start:dev
```

```powershell
cd rider-service; pnpm start:dev
```

The orders API listens on port `3000`. RabbitMQ is available on port `5672`; its management dashboard is available at `http://localhost:15672` using `guest` / `guest`.

## Project Structure

orders-service/ HTTP order creation and orders database
kitchen-service/ kitchen queue consumer and ticket database
rider-service/ rider queue consumer and dispatch database
docker-compose.yml RabbitMQ configuration
