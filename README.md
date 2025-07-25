README

I implemented this project with a strong focus on clean architecture, maintainability, and scalability. The backend is built with Node.js and Express, utilizing PostgreSQL as the relational database, ensuring well-structured data relationships between users, categories, and prompts. The integration with the OpenAI API allows for seamless lesson generation, and the use of an ORM guarantees maintainability and future extensibility.

On the frontend, I chose React to deliver a clean and user-friendly interface that allows learners to register, pick their topics of interest, send prompts, and review their lesson history. An admin panel provides an overview of all user activity and prompt history. The separation of concerns between services, routes, and database layers, combined with best practices in error handling and configuration, makes this application a solid foundation for further expansion and deployment in a production environment.

1. Project Technologies

Backend: Node.js, Express.js, Prisma ORM, PostgreSQL

Frontend: React.js, Vite, TypeScript, TailwindCSS

Testing: Jest (unit and API testing)

Docker: PostgreSQL container

2. Project Architecture

Backend Structure:

src/
│
├── controllers/
│ ├── userController.js — Handles user-related requests (create, fetch, etc.)
│ ├── categoryController.js — Handles categories logic
│ ├── promptController.js — Handles prompts logic
│
├── middleware/
│ ├── authMiddleware.js — Middleware for authentication, verifies JWT tokens & user authorization
│
├── routes/
│ ├── userRoutes.js — Defines API endpoints for users
│ ├── categoryRoutes.js — Defines API endpoints for categories
│ ├── promptRoutes.js — Defines API endpoints for prompts
│
├── services/
│ ├── openAiService.js — Handles OpenAI communication logic (or mocks)
│
├── prismaClient.js — Prisma connection to PostgreSQL, exports configured Prisma client
├── app.js — Express app configuration and middleware setup, connects routes and middleware
├── server.js — Server entry point, starts Express server and listens on specified port
├── swaggerOptions.js — Configuration for Swagger/OpenAPI documentation generation
│
├── tests/
│ ├── categories.test.js — Unit and integration tests for categories endpoints
│ ├── prompts.test.js — Unit and integration tests for prompts endpoints
│ ├── user.test.js — Unit and integration tests for user endpoints
└── docker-compose.yml — Docker Compose file to orchestrate services like app and database

Frontend Structure:

frontend/
│
├── api/
│ ├── api.ts — Axios API calls to backend
│
├── components/
│ ├── UserRegistration.tsx — New user registration form
│ ├── LearningDashboard.tsx — Dashboard for users
│ ├── AdminDashboard.tsx — Dashboard for admin with data display
│ ├── Login.tsx — User login component
| ├── UserContext.tsx — UserContext component
| ├── ScrollToTop.tsx — ScrollToTop component
| ├── Layout.tsx — Layout component
│
├── pages/
│ ├── Index.tsx — Main landing page
│ ├── Header.tsx — Application header component
| ├── AboutPage.tsx — AboutPage component
| ├── NotFound.tsx — NotFound component
│
├── types/
│ ├── types.ts — Shared TypeScript types (e.g., User, Prompt)
│
├── App.tsx — Frontend app configuration and routing
└── main.tsx — React app entry point

3. How to Run Backend and Frontend

Clone the repository from GitHub:

git clone https://github.com/Devora-Berkowitz/AI-Learning-Platform.git

Backend setup:

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Run the server in development mode:

npm run dev

Frontend setup:

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the development server:

npm start

Alternatively, from the root folder you can run:

npm install 

npm start

This will run both backend and frontend using concurrent commands.

4. Docker Instructions

PostgreSQL runs via Docker container.

To start the PostgreSQL container:

docker-compose up -d

To view running containers:

docker ps

To access PostgreSQL database via terminal:

docker exec -it <container_id> psql -U myuser -d ai_learning

Replace <container_id> with the actual container ID from docker ps (for example: 78a79ea3f469).

To list all tables:

\dt

To query data:

SELECT * FROM "Category";
SELECT * FROM "User";

To stop the container: 

docker-compose down

5. Sample .env example file:

# Backend
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/your_db_name
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
OPENAI_API_KEY=your_openai_key
CLIENT_URL=http://localhost:8080

# Frontend
VITE_API_URL=http://localhost:3000

6. Assumptions

Users are uniquely identified by their ID numbers.

OpenAI API calls are either real or mocked depending on the environment.

The admin dashboard can only be accessed via a dedicated route.

Database connection is managed via Prisma ORM.

PostgreSQL database runs inside Docker, ensuring environment consistency.

Environment variables are provided via .env file (example file included).

Both backend and frontend must be run simultaneously for full functionality.