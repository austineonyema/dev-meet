import { Test, TestingModule } from '@nestjs/testing';
import { CommentlikeService } from './commentlike.service';

describe('CommentlikeService', () => {
  let service: CommentlikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentlikeService],
    }).compile();

    service = module.get<CommentlikeService>(CommentlikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
