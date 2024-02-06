import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

export function StripHtml() {
  return (req: Request, res: Response, next: NextFunction) => {
    function cleanObject(obj: Record<string, unknown>) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string") {
          obj[key] = stripHtml(value).result;
        } else if (value && typeof value === "object") {
          cleanObject(value as Record<string, unknown>);
        }
      }
    }
    cleanObject(req.body);
    next();
  };
}
