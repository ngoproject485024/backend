import { Test, TestingModule } from '@nestjs/testing';
import { EventsEducationsService } from './events-educations.service';

describe('EventsEducationsService', () => {
  let service: EventsEducationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsEducationsService],
    }).compile();

    service = module.get<EventsEducationsService>(EventsEducationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
