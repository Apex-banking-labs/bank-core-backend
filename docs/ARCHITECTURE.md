# Core System Architecture & Data Isolation Blueprint

This document defines the immutable architectural rules, data boundaries, network topologies, and port routing configurations for the polyglot banking application backend.

---

## 🔒 Data Isolation Boundaries (Database-Per-Service)

To guarantee horizontal scalability, high availability, and absolute fault isolation, this system strictly enforces the **Database-Per-Service** pattern.

### Core Mandates
1. **Zero Direct Cross-Querying:** No microservice is permitted to connect directly to, read from, or write to a database instance owned by another service.
2. **Decoupled Schemas:** Changes made to the internal data schema of one service (e.g., modifying an account table layout) must never impact or break downstream services.
3. **Data Exchange Contracts:** All cross-domain data mutations and state requests must occur through explicit, verified interfaces: either synchronously via RESTful HTTP API endpoints or asynchronously via message broker events.

### Microservice Deployment Matrix

| Service Identifier | Runtime Runtime | Database Engine | Assigned Host Port | Data Domain Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| `api-gateway` | Node.js / Fastify | *None* (Stateless Proxy) | `8080` | Edge routing, JWT inspection, client rate-limiting |
| `auth-service` | Node.js / Fastify | Redis (In-Memory Data Store)| `8081` | Credential validation, token issuance, revocation lists |
| `account-service` | Java 17 / Spring Boot | PostgreSQL (`db_accounts`) | `8082` | Core customer account records, balances, profile metadata |
| `transaction-service`| Java 17 / Spring Boot | PostgreSQL (`db_transactions`)| `8083` | High-throughput ledger entries, audit trails, transfers |

---

## 🌐 Network Topology & Communication Flows

The backend cluster leverages two distinct styles of communication depending on the immediacy required by the operation.

### 1. Synchronous Edge Intercept & Proxying (HTTP/REST)
All incoming external client requests are intercepted strictly at the public edge by the API Gateway. The gateway handles transport security and authentication verification before reverse-proxying the requests deep into the private backend services layer.

* **Public Interface:** Port `8080` is the single open door to the outside world.
* **Internal Routing:** Services downstream talk back and forth over a secured, isolated local network bridge orchestrated by Docker.

```text
  [ External Client Request ]
               │
               ▼ (Public Transit Interface: Port 8080)
┌─────────────────────────────────────────┐
│       Fastify Edge API Gateway         │
└─────────────────────────────────────────┘
               │
               ├─► (Private Context: Port 8081) ──► [ Auth Service ]
               │
               ├─► (Private Context: Port 8082) ──► [ Account Service ]
               │
               └─► (Private Context: Port 8083) ──► [ Transaction Service ]
```
# 2. Asynchronous Event Choreography (RabbitMQ / AMQP)
   For state changes that don't need an instant reply (like sending an alert email or updating general system analytics when a transaction finishes), the system switches to non-blocking messaging.

* **Producer-Consumer Separation:** When a transaction settles, the transaction-service posts an event payload to a RabbitMQ Exchange.

* **Non-Blocking Execution:** The service finishes its job immediately without waiting for other systems to respond. Interested services pull and handle that event message at their own speed.

┌───────────────────────┐                    ┌─────────────────────────┐
│  Transaction Service  │ ──(Publishes)───►  │    RabbitMQ Exchange    │
└───────────────────────┘                    └─────────────────────────┘
│
(Routes Message)
│
▼
┌─────────────────────────┐
│     Account Service     │
│  (Consumes & Syncs Up)  │
└─────────────────────────┘