# City finder

## Installation

Run the following command to start the server:

```bash
docker-compose up --build
```

The server will be available at http://localhost:5000/

## Usage

Use Postman or another tool of your choice to make requests to the server.

The request must be a POST request
to the `suggestions` endpoint with the following query parameters (parameters are validated):

`q`: String, required.

`latitude`: Number between -90 and 90, required.

`longitude`: Number between -180 and 180, required.

`radius`: Number between 0 and 180, required.

`sort`: String, either `distance` or `name`, default `distance`.

Example for a valid request:

```
http://localhost:5000/suggestions?q=F&latitude=43.70011&longitude=-79.4163&radius=500
```

Note: API calls are limited to 5 requests per minute.
