import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import { basicPromptUseCase } from './use_cases/basic-prompt.use-case';
import { basicPromptStreamUseCase } from './use_cases/basic-prompt-stream.use-case';
import { awesomePromptUseCase } from './use_cases/awesome-prompt.use-case';

@Injectable()
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async basicPrompt(basicPromptDto: BasicPromptDto): Promise<string> {
    return await basicPromptUseCase(this.ai, basicPromptDto);
  }

  async basicPromptStream(
    basicPromptDto: BasicPromptDto,
  ): Promise<AsyncGenerator<GenerateContentResponse, any, any>> {
    return await basicPromptStreamUseCase(this.ai, basicPromptDto);
  }

  async awesomePrompt(basicPromptDto: BasicPromptDto): Promise<string> {
    return await awesomePromptUseCase(this.ai, basicPromptDto);
  }
}
