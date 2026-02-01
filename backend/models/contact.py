from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    id: Optional[str] = None
    success: bool
    message: str
    created_at: Optional[datetime] = None


class ContactRecord(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    read: bool = False
