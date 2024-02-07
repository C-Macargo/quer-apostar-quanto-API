import { ApplicationError } from "@/types/errorProtocol";

export function missingParticipantError(): ApplicationError {
  return {
    name: "missingParticipantError",
    message: "Participant does not exist!",
  };
}
