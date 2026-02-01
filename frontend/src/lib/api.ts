import { ContactFormData, ContactResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  const response = await fetch(`${API_URL}/api/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }

  return response.json();
}
