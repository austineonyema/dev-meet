import { Test, TestingModule } from '@nestjs/testing';
import { CommentlikeController } from './commentlike.controller';
import { CommentlikeService } from './commentlike.service';

describe('CommentlikeController', () => {
  let controller: CommentlikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentlikeController],
      providers: [CommentlikeService],
    }).compile();

    controller = module.get<CommentlikeController>(CommentlikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
