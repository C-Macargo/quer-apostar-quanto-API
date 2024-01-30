import { ApplicationError } from "@/util/errorProtocol";

export function gameAlreadyFinishedError(): ApplicationError {
  return {
    name: "gameAlreadyFinishedError",
    message: "The game has already finished!",
  };
}
