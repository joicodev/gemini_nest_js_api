import { Test, TestingModule } from '@nestjs/testing';
import { GeminiService } from '../src/gemini/gemini.service';
import { basicPromptUseCase } from '../src/gemini/use_cases/basic-prompt.use-case';
import { basicPromptStreamUseCase } from '../src/gemini/use_cases/basic-prompt-stream.use-case';
import { BasicPromptDto } from '../src/gemini/dtos/basic-prompt.dto';
import { GoogleGenAI } from '@google/genai';

// Mock the use cases
jest.mock('../src/gemini/use_cases/basic-prompt.use-case');
jest.mock('../src/gemini/use_cases/basic-prompt-stream.use-case');

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: GoogleGenAI,
          useValue: {
            // Mock any methods of GoogleGenAI that are used in the service
          },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('basicPrompt', () => {
    it('should call basicPromptUseCase with the correct parameters', async () => {
      const basicPromptDto: BasicPromptDto = { prompt: 'Hello', files: [] };
      const expectedResult = 'Response from AI';
      (basicPromptUseCase as jest.Mock).mockResolvedValue(expectedResult);

      const result = await service.basicPrompt(basicPromptDto);

      expect(basicPromptUseCase).toHaveBeenCalledWith(
        expect.any(GoogleGenAI),
        basicPromptDto,
      );
      expect(result).toBe(expectedResult);
    });
  });

  describe('basicPromptStream', () => {
    it('should call basicPromptStreamUseCase with the correct parameters', async () => {
      const basicPromptDto: BasicPromptDto = { prompt: 'Hello stream', files: [] };
      const mockStream = (async function* () {
        yield { text: 'chunk1' };
        yield { text: 'chunk2' };
      })();
      (basicPromptStreamUseCase as jest.Mock).mockResolvedValue(mockStream);

      const result = await service.basicPromptStream(basicPromptDto);

      expect(basicPromptStreamUseCase).toHaveBeenCalledWith(
        expect.any(GoogleGenAI),
        basicPromptDto,
      );
      expect(result).toBe(mockStream);
    });
  });
});
