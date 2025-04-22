// src/fields/shared/sanitize.ts

/**
 * Basic script sanitization utility
 * Strips <script> tags and optionally other unsafe patterns
 */
export const sanitizeScript = (input: string): string => {
    if (!input) return input;
  
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '/* script removed */')
      .replace(/on\w+="[^"]*"/gi, '') // remove inline event handlers like onclick=""
      .replace(/javascript:/gi, '')   // strip dangerous URI schemes
      .trim();
  };
  