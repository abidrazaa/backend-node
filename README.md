# backend-node

## Getting Started

Follow these steps to set up the project on your local machine:

### Clone the Repository

Clone this repository to your local machine.

### Option 1 - Local

#### Install

Install the dependencies.

```bash
npm install
```

#### Start

Start the Backend:

```bash
npm run start
```

> Backend will available at <http://localhost:4000>.

### Option 2 - Docker

#### Install Docker

Install [docker](https://www.docker.com/products/docker-desktop/) required to run the Backend.

#### Start Docker

```bash
docker compose up --build
```

> Backend will available at <http://localhost:4000>.
> DB url for docker is <mongodb://mongo:27017/easycart-db>.
