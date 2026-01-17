// Email Configuration
// All sensitive values are now loaded from environment variables
// See .env.example for required variables

export const EMAIL_CONFIG = {
    // Web3Forms access key - loaded from environment
    accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '',

    // Contact email - loaded from environment
    toEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',

    // Form settings
    subject: 'New Message from Portfolio Website',
    fromName: process.env.NEXT_PUBLIC_FORM_FROM_NAME || 'Portfolio Contact Form',

    // Validation helper
    isConfigured(): boolean {
        return Boolean(this.accessKey && this.toEmail);
    }
};
