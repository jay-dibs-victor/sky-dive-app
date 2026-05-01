# Skycast

A weather forecasting application built with React and Redux using the connect API pattern. It displays current weather conditions, hourly forecasts, and multi-day outlooks for any location using a public weather API that required no API key.

## Features

Users can search for a city name to retrieve its current weather data. The dashboard shows temperature, humidity, wind speed, weather description, and a weather condition indicator. A five-day forecast section displays daily high and low temperatures. The Redux store manages the search query state, fetched weather data, and API loading and error states.

## Technology Stack

- React: UI component library used for building the search interface and weather display components.
- Redux (connect pattern): State management for weather data and search state. Components are connected to the store using the connect higher-order component from react-redux.
- Redux Thunk: Middleware for handling asynchronous API calls within action creators.
- Vite: Build tool and development server.
- Public weather API: A free weather data endpoint available in 2022 with no authentication required.

## Project Structure

Source components include the search bar, the current conditions card, the forecast list, and error and loading indicators. Redux logic is split into action creators for fetching weather data and a reducer that processes API responses. The store is configured and provided to the application at the root level.

## Running the Project

Install dependencies and start the development server:

    npm install
    npm run dev

Last updated: 2026-05-01
