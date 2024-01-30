import { ApplicationError } from '@/util/errorProtocol';

export function insufficientFundsError(): ApplicationError {
  return {
    name: 'insufficientFundsError',
    message: 'Participant does not have enough funds to bet!',
  };
}