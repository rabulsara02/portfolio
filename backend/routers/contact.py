from fastapi import APIRouter, HTTPException, Depends
from models.contact import ContactForm, ContactResponse
from services.supabase import SupabaseService, get_supabase_service
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse)
async def submit_contact(
    contact: ContactForm,
    supabase: SupabaseService = Depends(get_supabase_service)
) -> ContactResponse:
    """Submit a contact form."""
    try:
        contact_id = await supabase.create_contact(contact)

        if contact_id:
            return ContactResponse(
                id=contact_id,
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                created_at=datetime.utcnow()
            )
        else:
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                created_at=datetime.utcnow()
            )
    except Exception as e:
        logger.error(f"Contact submission failed: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit contact form. Please try again later."
        )


@router.get("/health")
async def health_check():
    """Health check endpoint for the contact service."""
    return {"status": "healthy", "service": "contact"}
