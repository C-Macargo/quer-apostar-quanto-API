import { ApplicationError } from '@/util/errorProtocol';

export function missingGameError(): ApplicationError {
  return {
    name: 'missingGameError',
    message: 'Game does not Exist!',
  };
}