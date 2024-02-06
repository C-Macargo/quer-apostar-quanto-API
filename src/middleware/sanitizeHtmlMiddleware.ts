import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

export function sanitizeString() {
  return (req: Request, res: Response, next: NextFunction) => {
    function cleanObject(obj: Record<string, unknown>) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string") {
          obj[key] = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          }).trim();
        } else if (value && typeof value === "object") {
          cleanObject(value as Record<string, unknown>);
        }
      }
    }
    cleanObject(req.body);
    next();
  };
}
