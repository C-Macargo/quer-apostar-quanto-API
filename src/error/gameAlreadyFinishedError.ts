import { ApplicationError } from '@/util/errorProtocol';

export function gameAlreadyFinishedError(): ApplicationError {
  return {
    name: 'gameAlreadyFinished',
    message: 'The game has already finished!',
  };
}