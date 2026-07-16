from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, profile
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title=settings.APP_NAME, version="1.0.0", lifespan=lifespan)

origins = settings.cors_origins_list
allow_all_origins = origins == ["*"]

# Auth uses a bearer token (not cookies), so it's safe to allow any origin
# without allow_credentials - this avoids brittle origin whitelisting when
# the frontend is reached through a proxied/forwarded URL (e.g. in VS Code's
# preview) instead of a plain http://localhost:PORT.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all_origins else origins,
    allow_credentials=not allow_all_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}
