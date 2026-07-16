import re
from datetime import date

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

from app.models.user import UserRole
from app.schemas.user import UserOut
from app.utils import calculate_age

PHONE_PATTERN = re.compile(r"^[+]?[\d\s()-]{7,20}$")


class SignupRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    date_of_birth: date
    role: UserRole

    email: EmailStr | None = None
    phone_number: str | None = None
    password: str | None = None

    guardian_name: str | None = None
    guardian_email: EmailStr | None = None
    guardian_phone: str | None = None

    @field_validator("date_of_birth")
    @classmethod
    def validate_date_of_birth(cls, value: date) -> date:
        if value >= date.today():
            raise ValueError("Date of birth must be in the past.")
        age = calculate_age(value)
        if age > 100:
            raise ValueError("Please enter a valid date of birth.")
        return value

    @field_validator("phone_number", "guardian_phone")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None:
            return value
        if not PHONE_PATTERN.match(value):
            raise ValueError("Enter a valid phone number.")
        return value

    @model_validator(mode="after")
    def validate_age_specific_fields(self) -> "SignupRequest":
        age = calculate_age(self.date_of_birth)

        if age < 18:
            missing = [
                field
                for field, value in (
                    ("guardian_name", self.guardian_name),
                    ("guardian_email", self.guardian_email),
                    ("guardian_phone", self.guardian_phone),
                )
                if not value
            ]
            if missing:
                raise ValueError(
                    f"Guardian details are required for users under 18: {', '.join(missing)}"
                )
        else:
            missing = [
                field
                for field, value in (
                    ("email", self.email),
                    ("phone_number", self.phone_number),
                    ("password", self.password),
                )
                if not value
            ]
            if missing:
                raise ValueError(f"The following fields are required: {', '.join(missing)}")
            if self.password and len(self.password) < 8:
                raise ValueError("Password must be at least 8 characters long.")

        return self


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
