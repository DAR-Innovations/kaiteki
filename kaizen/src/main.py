import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import kaizen_router
from config.settings_config import get_settings
import uvicorn
from schemas import settings_schema

def configure_logging():
    logger = logging.getLogger("uvicorn.access")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
    logger.addHandler(handler)
    return logger


def create_app(settings: settings_schema.Settings):
    app = FastAPI(
        title=settings.api_config.title,
        description=settings.api_config.description,
        version=settings.api_config.version,
        docs_url=settings.api_config.docs_url,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(kaizen_router.kaizen_v1_router)
    return app


if __name__ == "__main__":
    settings = get_settings()
    logger = configure_logging()
    app = create_app(settings)
    server = settings.uvicorn
    uvicorn.run(
        app="main:app",
        host=server.host,
        port=server.port,
        log_level=server.log_level,
        reload=server.reload,
    )
