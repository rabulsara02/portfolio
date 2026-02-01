# Portfolio Website

A modern full-stack portfolio website built with Next.js and FastAPI.

## Tech Stack

**Frontend:**
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Supabase Client

**Backend:**
- FastAPI (Python)
- Supabase for database
- Pydantic for validation

**Deployment:**
- Docker & Docker Compose
- Kubernetes configurations
- Vercel (frontend) compatible

## Project Structure

```
portfolio-website/
├── backend/                 # FastAPI backend
│   ├── config/             # Configuration settings
│   ├── models/             # Pydantic models
│   ├── routers/            # API routes
│   ├── services/           # Business logic & Supabase
│   ├── main.py             # FastAPI application
│   ├── Dockerfile          # Backend Docker config
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities & API client
│   │   └── types/         # TypeScript types
│   ├── Dockerfile         # Frontend Docker config
│   └── package.json       # Node dependencies
├── kubernetes/            # K8s deployment configs
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── secrets.yaml.example
├── docker-compose.yml     # Local development
└── README.md
```

## Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (optional)
- Supabase account

## Supabase Setup

1. Create a new Supabase project
2. Create the contacts table:

```sql
CREATE TABLE contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (public can submit)
CREATE POLICY "Anyone can submit contact" ON contacts
    FOR INSERT WITH CHECK (true);

-- Create policy for reading (only authenticated users)
CREATE POLICY "Only authenticated can read" ON contacts
    FOR SELECT USING (auth.role() = 'authenticated');
```

## Local Development

### Option 1: Run Separately

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Supabase credentials
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

### Option 2: Docker Compose

```bash
cp .env.example .env
# Edit .env with your credentials
docker-compose up --build
```

The frontend will be available at http://localhost:3000 and the backend API at http://localhost:8000.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API info |
| GET | /health | Health check |
| POST | /api/contact/ | Submit contact form |
| GET | /api/contact/health | Contact service health |

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`

### Kubernetes

```bash
# Create namespace
kubectl apply -f kubernetes/namespace.yaml

# Create secrets (copy and edit secrets.yaml.example first)
kubectl apply -f kubernetes/secrets.yaml

# Apply configurations
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/ingress.yaml
```

### Docker (Backend)

```bash
cd backend
docker build -t portfolio-backend .
docker run -p 8000:8000 \
  -e SUPABASE_URL=your-url \
  -e SUPABASE_KEY=your-key \
  portfolio-backend
```

## Customization

1. Update personal information in:
   - `frontend/src/components/Hero.tsx`
   - `frontend/src/components/About.tsx`
   - `frontend/src/components/Contact.tsx`
   - `frontend/src/app/layout.tsx` (metadata)

2. Add your projects in:
   - `frontend/src/components/Projects.tsx`

3. Update skills in:
   - `frontend/src/components/Skills.tsx`

## License

MIT
