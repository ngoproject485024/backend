import { Test, TestingModule } from '@nestjs/testing';
import { EventsEducationsController } from './events-educations.controller';
import { EventsEducationsService } from './events-educations.service';

describe('EventsEducationsController', () => {
  let controller: EventsEducationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsEducationsController],
      providers: [EventsEducationsService],
    }).compile();

    controller = module.get<EventsEducationsController>(EventsEducationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
