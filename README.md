# Notification Dashboard

A modern, responsive, production-ready React application built for viewing and filtering system notifications. 

## Features
- **Live API Integration**: Fetches notifications dynamically from the Evaluation Service API.
- **Server-Side Pagination**: Efficiently loads data using `page` and `limit` parameters to ensure optimal performance.
- **Advanced Filtering**: Filter notifications by `notification_type` (Placement, Event, Result) via server queries, and perform local searches by keyword.
- **Priority Sorting Logic**: Ensures critical alerts are seen first (Priority: Placement > Event > Result). Timestamp sorting applies for notifications of the same priority.
- **Custom Logging Middleware**: A centralized logger tracks UI events, state changes, and API requests/responses in the console.
- **Clean Architecture**: Built with Vite, utilizing reusable hooks (`useNotifications`), modular CSS (`.module.css`), and isolated services.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and provide your access token:
   ```env
   VITE_ACCESS_TOKEN="your_jwt_access_token_here"
   ```
   *(Note: The JWT token is required to authenticate requests against the backend service. Tokens expire shortly after generation, so ensure your token is fresh!)*

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Architecture & Structure
- `/src/components`: UI building blocks (NotificationCard, SearchFilter, Pagination, etc.)
- `/src/hooks`: Custom React hooks (state management & data fetching)
- `/src/services`: External API handlers and authentication
- `/src/middleware`: Centralized logging logic
- `/src/utils`: Helper functions (sorting logic)
