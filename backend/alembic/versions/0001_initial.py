"""initial schema: users and guardians

Revision ID: 0001
Revises:
Create Date: 2026-07-14

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    user_role = sa.Enum("student", "parent", "teacher", name="user_role")
    user_role.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("full_name", sa.String(length=120), nullable=False),
        sa.Column("date_of_birth", sa.Date(), nullable=False),
        sa.Column("age", sa.Integer(), nullable=False),
        sa.Column("role", user_role, nullable=False),
        sa.Column("is_minor", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("phone_number", sa.String(length=32), nullable=True),
        sa.Column("password_hash", sa.String(length=255), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_users_id", "users", ["id"])
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "guardians",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
            unique=True,
        ),
        sa.Column("guardian_name", sa.String(length=120), nullable=False),
        sa.Column("guardian_email", sa.String(length=255), nullable=False),
        sa.Column("guardian_phone", sa.String(length=32), nullable=False),
    )
    op.create_index("ix_guardians_id", "guardians", ["id"])
    op.create_index("ix_guardians_user_id", "guardians", ["user_id"])
    op.create_index("ix_guardians_guardian_email", "guardians", ["guardian_email"])


def downgrade() -> None:
    op.drop_index("ix_guardians_guardian_email", table_name="guardians")
    op.drop_index("ix_guardians_user_id", table_name="guardians")
    op.drop_index("ix_guardians_id", table_name="guardians")
    op.drop_table("guardians")

    op.drop_index("ix_users_email", table_name="users")
    op.drop_index("ix_users_id", table_name="users")
    op.drop_table("users")

    sa.Enum(name="user_role").drop(op.get_bind(), checkfirst=True)
