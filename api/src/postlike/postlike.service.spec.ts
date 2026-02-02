import { Test, TestingModule } from '@nestjs/testing';
import { PostlikeService } from './postlike.service';

describe('PostlikeService', () => {
  let service: PostlikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostlikeService],
    }).compile();

    service = module.get<PostlikeService>(PostlikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
