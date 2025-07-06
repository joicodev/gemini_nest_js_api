import { GoogleGenAI } from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';

interface Options {
  model?: string;
  systemInstruction?: string;
}

export const awesomePromptUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
): Promise<string> => {
  const {
    model = 'gemini-2.0-flash',
    systemInstruction = `improve this prompt: ${basicPromptDto.prompt}`,
  } = options ?? {};

  const response = await ai.models.generateContent({
    model: model,
    contents: basicPromptDto.prompt,
    config: {
      systemInstruction,
    },
  });

  return response.text ?? '';
}; 