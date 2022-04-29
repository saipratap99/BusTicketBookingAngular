import { TestBed } from '@angular/core/testing';

import { MsgCommunicationService } from './msg-communication.service';

describe('MsgCommunicationService', () => {
  let service: MsgCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
