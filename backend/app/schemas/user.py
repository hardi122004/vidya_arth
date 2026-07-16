from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from app.models.user import UserRole


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    date_of_birth: date
    age: int
    role: UserRole
    is_minor: bool
    email: str | None
    phone_number: str | None
    created_at: datetime
