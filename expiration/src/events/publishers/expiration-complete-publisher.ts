import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@dev-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
  > {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
