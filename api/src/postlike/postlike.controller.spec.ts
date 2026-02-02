import { Test, TestingModule } from '@nestjs/testing';
import { PostlikeController } from './postlike.controller';
import { PostlikeService } from './postlike.service';

describe('PostlikeController', () => {
  let controller: PostlikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostlikeController],
      providers: [PostlikeService],
    }).compile();

    controller = module.get<PostlikeController>(PostlikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
