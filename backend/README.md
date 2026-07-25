# Aks Rooh — API

The private backend API for Aks Rooh — a soul-garden journal application.  
Handles user authentication, journal entries, and AI-powered reflection insights.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 4
- **Database:** SQLite (via `sql.js`, auto-created)
- **Auth:** bcryptjs + JSON Web Tokens (JWT)
- **Validation:** Zod
- **AI:** OpenAI API (optional — falls back to local summaries)

## Getting Started

```bash
# 1. Copy environment config
cp .env.example .env

# 2. Edit .env and set a strong JWT_SECRET

# 3. Install dependencies
npm install

# 4. Start the development server (with --watch)
npm run dev

# Or start in production mode
npm start
```

The API listens on `http://localhost:4000` by default.  
The SQLite database is created automatically at `data/aks-rooh.db` and is ignored by Git.

## Environment Variables

| Variable         | Required | Default                  | Description                            |
|------------------|----------|--------------------------|----------------------------------------|
| `JWT_SECRET`     | **Yes**  | —                        | Secret key for signing JWT tokens      |
| `PORT`           | No       | `4000`                   | API server port                        |
| `CLIENT_ORIGIN`  | No       | `http://localhost:3000`  | Allowed CORS origin                    |
| `OPENAI_API_KEY` | No       | —                        | OpenAI API key for AI insights         |
| `OPENAI_MODEL`   | No       | `gpt-4.1-mini`           | OpenAI model to use                    |

> **Note:** If `OPENAI_API_KEY` is not set, the API uses a local fallback that generates theme-based reflection summaries.

## API Routes

### Health
| Method | Path          | Description         |
|--------|---------------|---------------------|
| GET    | `/api/health` | Server health check |

### Authentication
| Method | Path               | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/api/auth/register` | Create a new account           |
| POST   | `/api/auth/login`    | Log in to existing account     |
| GET    | `/api/auth/me`       | Get current user (auth required) |

### Journal Entries (auth required)
| Method | Path               | Description                         |
|--------|--------------------|-------------------------------------|
| GET    | `/api/entries`     | List all entries (newest first)     |
| POST   | `/api/entries`     | Create a new journal entry          |
| DELETE | `/api/entries/:id` | Delete a specific entry             |

### Insights (auth required)
| Method | Path            | Description                           |
|--------|-----------------|---------------------------------------|
| GET    | `/api/insights` | Get AI-generated reflection insights  |

## Entry Schema

```json
{
  "text": "string (1-5000 chars)",
  "mood": "integer (1-5)"
}
```

## Security

- Passwords are hashed with bcrypt (12 salt rounds)
- JWT tokens expire after 7 days
- All journal routes are protected by Bearer token authentication
- Input validation via Zod schemas
- SQL injection protection via parameterized queries

## Project Structure

```
backend/
├── src/
│   ├── server.js          # Express app & routes
│   ├── db.js              # SQLite database setup
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   └── services/
│       └── insights.js    # AI reflection generation
├── data/                  # Auto-created SQLite database
├── .env.example           # Environment template
├── package.json
└── README.md
```

---

> This API offers reflective support, not medical or mental-health diagnosis.

