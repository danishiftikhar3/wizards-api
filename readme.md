# Wizards-API for Pircel Recruitment Application

## Overview

Wizards-API is a backend service designed for the Pircel recruitment application. Built with Express.js and TypeScript, this service acts as a gateway to fetch wizard data from an external API and provides a streamlined interface for front-end applications to access wizard information.

## Features

- **Fetch Wizards**: Retrieves wizard data from the Wizard World API at `https://wizard-world-api.herokuapp.com/houses`.
- **RESTful API**: Offers a simple REST API endpoint at `https://wizards-api.vercel.app/houses` for accessing wizard data.
- **Built with Express.js and TypeScript**: Utilizes Express.js for the server framework and TypeScript for type-safe code development.

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

```sh
git clone <repository-url>
cd wizards-api
```

2. **Install Dependencies**

```sh
npm install
```

3. **Run the Application**

```sh
npm start
```

This starts the application and serves the API at `http://localhost:<port>/houses`, where `<port>` is the port number specified in your environment or the default port defined by the application.

### Using the API

To fetch wizard data, send a GET request to the API endpoint:

```sh
GET https://wizards-api.vercel.app/houses
```

This request will return a JSON response containing the wizard data fetched from the Wizard World API.


## Contact

For any inquiries or further assistance, please reach out to danish6712@gmail.com.

