import { ApplicationError } from "@/types/errorProtocol";

export function missingGameError(): ApplicationError {
  return {
    name: "missingGameError",
    message: "Game does not exist!",
  };
}
