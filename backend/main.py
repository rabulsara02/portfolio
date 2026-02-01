from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from config import get_settings
from routers import contact_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Portfolio API...")
    yield
    logger.info("Shutting down Portfolio API...")


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title="Portfolio API",
        description="Backend API for portfolio website",
        version="1.0.0",
        lifespan=lifespan
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(contact_router)

    @app.get("/")
    async def root():
        return {
            "message": "Portfolio API",
            "version": "1.0.0",
            "docs": "/docs"
        }

    @app.get("/health")
    async def health():
        return {"status": "healthy"}

    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.environment == "development"
    )
