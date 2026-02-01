from supabase import create_client, Client
from functools import lru_cache
from config import get_settings
from models.contact import ContactForm, ContactRecord
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class SupabaseService:
    def __init__(self, client: Client):
        self.client = client

    async def create_contact(self, contact: ContactForm) -> Optional[str]:
        """Create a new contact submission in the database."""
        try:
            result = self.client.table("contacts").insert({
                "name": contact.name,
                "email": contact.email,
                "subject": contact.subject,
                "message": contact.message,
            }).execute()

            if result.data:
                return result.data[0].get("id")
            return None
        except Exception as e:
            logger.error(f"Failed to create contact: {e}")
            raise

    async def get_contacts(self, limit: int = 50) -> list[ContactRecord]:
        """Retrieve contact submissions."""
        try:
            result = self.client.table("contacts").select("*").order(
                "created_at", desc=True
            ).limit(limit).execute()

            return [ContactRecord(**record) for record in result.data]
        except Exception as e:
            logger.error(f"Failed to get contacts: {e}")
            raise

    async def mark_contact_read(self, contact_id: str) -> bool:
        """Mark a contact as read."""
        try:
            result = self.client.table("contacts").update({
                "read": True
            }).eq("id", contact_id).execute()

            return len(result.data) > 0
        except Exception as e:
            logger.error(f"Failed to mark contact as read: {e}")
            raise


@lru_cache()
def get_supabase_client() -> Client:
    settings = get_settings()
    return create_client(settings.supabase_url, settings.supabase_key)


def get_supabase_service() -> SupabaseService:
    return SupabaseService(get_supabase_client())
