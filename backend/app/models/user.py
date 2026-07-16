import enum
from datetime import date, datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Date, DateTime, Enum, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.guardian import Guardian


class UserRole(str, enum.Enum):
    STUDENT = "student"
    PARENT = "parent"
    TEACHER = "teacher"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="user_role"), nullable=False)
    is_minor: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    email: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True, index=True)
    phone_number: Mapped[str | None] = mapped_column(String(32), nullable=True)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    guardian: Mapped["Guardian | None"] = relationship(
        "Guardian", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
