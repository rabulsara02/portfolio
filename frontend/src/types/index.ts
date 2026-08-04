export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot. Real people leave this empty; bots fill it in. */
  website?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  /** Field-level validation errors, keyed by field name. */
  errors?: Partial<Record<keyof ContactFormData, string>>;
}
