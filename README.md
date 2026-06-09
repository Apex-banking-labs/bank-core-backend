# Apex Banking Labs: Polyglot Microservices Backend

A production-grade, highly available, distributed banking backend engineered with a split-stack polyglot architecture to maximize throughput, data consistency, and security.

## 🏛 System Architecture Overview

The system utilizes a split-ecosystem approach to leverage the exact operational strengths of separate runtimes:
* **Edge Routing & Identity:** Driven by **Node.js & Fastify** for fast, low-overhead request processing, I/O performance, and security middleware handling.
* **Core Banking Domain:** Driven by **Java 17 & Spring Boot** to handle precise transaction logic, stateful domain operations, and high-concurrency database calculations.



## 🛠 Tech Stack Components

### 1. Edge & Authentication Layer (Node.js)
* **API Gateway / Auth Service:** Managed via `Fastify`, providing efficient reverse proxying, JWT-based state-less session verification, and request rate-limiting.

### 2. Banking Core Layer (Java JVM)
* **Account Service:** Spring Boot application running on the Embedded Tomcat container, managing ledger schemas, banking profiles, and balances.
* **Transaction Ledger Service:** Spring Boot application processing high-frequency ledger entries, executing ACID compliance safety checks, and communicating via message queues.

### 3. Shared Infrastructure (Docker Compose)
* **Databases:** Dual isolated instances of `PostgreSQL 15+` (Data isolation per service).
* **Caching:** `Redis` for rapid token revocation lookups and session caching.
* **Message Broker:** `RabbitMQ` handling asynchronous, event-driven message queues between microservices.

## 🚀 Local Development Setup (Ubuntu Linux)

### System Prerequisites
Ensure your local Ubuntu environment has the following runtimes configured globally:
* **Docker & Docker Compose** (V2+)
* **Node.js** (v20+ LTS)
* **Java Development Kit (JDK 17)**

### Orchestrated Infrastructure Bootup
To spin up the shared state infrastructure layers locally, navigate to the docker layout directory and invoke:
```bash
docker compose up -d
````
## 🚀 Local Development Setup & Runtime Installation

This repository requires specific system-level runtimes to build and run our polyglot microservices (Node.js/Java). Follow the setup instructions specific to your operating system below.

---

### 🐧 Option A: Ubuntu Linux Setup (Native Environment)

Execute the following commands in your terminal to provision your dependencies using the native `apt` package manager and official ecosystem repositories.

#### 1. System Updates & Core Build Tools
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -
sudo apt install -y nodejs

sudo apt install -y wget apt-transport-https gnupg
sudo mkdir -p /etc/apt/keyrings
wget -O - [https://packages.adoptium.net/artifactory/api/gpg/key/public](https://packages.adoptium.net/artifactory/api/gpg/key/public) | sudo gpg --dearmor -o /etc/apt/keyrings/adoptium.gpg

echo "deb [signed-by=/etc/apt/keyrings/adoptium.gpg] [https://packages.adoptium.net/artifactory/deb](https://packages.adoptium.net/artifactory/deb) $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

sudo apt update
sudo apt install -y temurin-17-jdk

sudo apt install -y docker.io docker-compose-v2
# Allow running docker commands without sudo
sudo usermod -aG docker $USER
newgrp docker

````

## 🪟 Option B: Windows Setup
For Windows environments, we explicitly mandate installing runtimes via the Windows Package Manager (winget) or executing within WSL2 (Windows Subsystem for Linux) to guarantee architectural parity.

## 1. Command Line Installation (PowerShell / Command Prompt as Admin)
   Open your terminal as an Administrator and execute the following commands to install the exact matching ecosystem runtimes seamlessly:
# Install Git Version Control
````
winget install --id Git.Git -e --source winget
````

# Install Node.js LTS (v20+)
````
winget install --id OpenJS.NodeJS.LTS -e --source winget
````

# Install Eclipse Temurin JDK 17
````
winget install --id EclipseAdoptium.Temurin.17.JDK -e --source winget
````

# Install Docker Desktop (Includes Engine and Compose V2)
````
winget install --id Docker.DockerDesktop -e --source winget
````

Note: After running these commands, restart your terminal or computer to refresh your environment variables (PATH).

# 2. Docker Setup Requirement
   When configuring Docker Desktop for Windows, make sure to enable the WSL2-based engine in the settings. This ensures the filesystem and networking protocols match up flawlessly with our container configurations.

# 🏗️ Orchestrated Infrastructure Bootup (All Operating Systems)
Once your system dependencies are installed and verified, navigate to your project root where your configuration file sits and invoke:

````
Bash
docker compose up -d
````