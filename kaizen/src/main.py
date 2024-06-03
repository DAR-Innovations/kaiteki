
import logging
import os

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import kaizen_router


def configure_logging():
    logger = logging.getLogger("uvicorn.access")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s"))
    logger.addHandler(handler)
    return logger


app = FastAPI(
    title="Kaizen FastAPI Server",
    description="API Documentation for Kaizen FastAPI Server",
    version="0.0.1",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kaizen_router.kaizen_v1_router)


if __name__ == "__main__":
    logger = configure_logging()
    uvicorn.run(
        app="main:app",
        host="0.0.0.0",
        port=os.getenv("PORT") or 8000,
        log_level="info",
        reload=True,
    )
