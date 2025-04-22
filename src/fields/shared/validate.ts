// src/fields/shared/validate.ts

/**
 * URL Validation Utility
 */
export const validateUrl = (
    value: string,
    options: {
      required?: boolean;
      https?: boolean;
      allowedProtocols?: string[];
      customPattern?: RegExp;
      customMessage?: string;
    } = {}
  ): true | string => {
    const {
      required = false,
      https = false,
      allowedProtocols = ['http', 'https'],
      customPattern,
      customMessage,
    } = options;
  
    if (!value) {
      return required ? 'This field is required' : true;
    }
  
    try {
      const url = new URL(value);
      const protocol = url.protocol.replace(':', '');
  
      if (https && protocol !== 'https') {
        return 'URL must use HTTPS';
      }
  
      if (!allowedProtocols.includes(protocol)) {
        return `URL must use one of: ${allowedProtocols.join(', ')}`;
      }
  
      if (customPattern && !customPattern.test(value)) {
        return customMessage || 'URL does not match the required pattern';
      }
  
      return true;
    } catch {
      return 'Please enter a valid URL';
    }
  };
  
  /**
   * Email Validation Utility
   */
  export const validateEmail = (value: string): true | string => {
    if (!value) return true;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
      ? true
      : 'Please enter a valid email address';
  };
  
  /**
   * Hex Color Validation Utility
   */
  export const validateHexColor = (value: string): true | string => {
    if (!value) return true;
  
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexRegex.test(value)
      ? true
      : 'Please enter a valid hex color (e.g. #FF5500)';
  };
  