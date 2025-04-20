import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dot';
import { GoogleGenAI } from '@google/genai';
import { basicPromptUseCase } from './use_cases/basic-prompt.use-case';

@Injectable()
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async basicPrompt(basicPromptDto: BasicPromptDto): Promise<string> {
    return await basicPromptUseCase(this.ai, basicPromptDto);
  }
}
