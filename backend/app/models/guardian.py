from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.user import User


class Guardian(Base):
    __tablename__ = "guardians"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True, index=True
    )
    guardian_name: Mapped[str] = mapped_column(String(120), nullable=False)
    guardian_email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    guardian_phone: Mapped[str] = mapped_column(String(32), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="guardian")
