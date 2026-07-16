from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.models.guardian import Guardian
from app.models.user import User
from app.schemas.auth import SignupRequest
from app.utils import calculate_age


class DuplicateUserError(Exception):
    pass


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email))


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)


def _find_duplicate_minor(db: Session, payload: SignupRequest) -> User | None:
    return db.scalar(
        select(User)
        .join(Guardian)
        .where(
            User.full_name == payload.full_name,
            User.date_of_birth == payload.date_of_birth,
            Guardian.guardian_email == payload.guardian_email,
        )
    )


def create_user(db: Session, payload: SignupRequest) -> User:
    age = calculate_age(payload.date_of_birth)
    is_minor = age < 18

    if is_minor:
        if _find_duplicate_minor(db, payload) is not None:
            raise DuplicateUserError("An account for this student already exists for this guardian.")
    else:
        if payload.email and get_user_by_email(db, payload.email) is not None:
            raise DuplicateUserError("An account with this email already exists.")

    user = User(
        full_name=payload.full_name,
        date_of_birth=payload.date_of_birth,
        age=age,
        role=payload.role,
        is_minor=is_minor,
        email=payload.email if not is_minor else None,
        phone_number=payload.phone_number if not is_minor else None,
        password_hash=hash_password(payload.password) if (not is_minor and payload.password) else None,
    )

    if is_minor:
        user.guardian = Guardian(
            guardian_name=payload.guardian_name or "",
            guardian_email=payload.guardian_email or "",
            guardian_phone=payload.guardian_phone or "",
        )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if user is None or user.password_hash is None:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
