// formValidation.ts - Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export const validateContactForm = (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!formData.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (formData.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone validation (optional but if provided, should be valid)
  if (formData.phone && !/^[+]?[0-9\s\-()]{10,15}$/.test(formData.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  // Subject validation
  if (!formData.subject) {
    errors.push({ field: 'subject', message: 'Please select a subject' });
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
};

export const validateQuoteForm = (formData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  productType: string;
  description: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Contact Person validation
  if (!formData.name.trim()) {
    errors.push({ field: 'name', message: 'Contact person name is required' });
  } else if (formData.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  // Company validation
  if (!formData.company.trim()) {
    errors.push({ field: 'company', message: 'Company name is required' });
  } else if (formData.company.trim().length < 2) {
    errors.push({ field: 'company', message: 'Company name must be at least 2 characters' });
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!/^[+]?[0-9\s\-()]{10,15}$/.test(formData.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  // Industry validation
  if (!formData.industry) {
    errors.push({ field: 'industry', message: 'Please select your industry' });
  }

  // Product Type validation
  if (!formData.productType) {
    errors.push({ field: 'productType', message: 'Please select a product type' });
  }

  // Description validation
  if (!formData.description.trim()) {
    errors.push({ field: 'description', message: 'Project description is required' });
  } else if (formData.description.trim().length < 20) {
    errors.push({ field: 'description', message: 'Please provide a detailed description (at least 20 characters)' });
  }

  return errors;
};

// Helper function to format phone numbers
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, '$1-$2');
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2-$3');
  }
  
  return phone;
};