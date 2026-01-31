import { Test, TestingModule } from '@nestjs/testing';
import { UserTagsController } from './user-tags.controller';

describe('UserTagsController', () => {
  let controller: UserTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTagsController],
    }).compile();

    controller = module.get<UserTagsController>(UserTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
