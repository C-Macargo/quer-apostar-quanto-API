import { ApplicationError } from '@/util/errorProtocol';

export function missingParticipantError(): ApplicationError {
  return {
    name: 'missingParticipantError',
    message: 'Participant does not Exist!',
  };
}