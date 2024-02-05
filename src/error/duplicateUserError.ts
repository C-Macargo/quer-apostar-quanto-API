import { ApplicationError } from "@/types/errorProtocol";

export function duplicateUserError(): ApplicationError {
  return {
    name: "duplicateUserError",
    message: "Name is already being used!",
  };
}
