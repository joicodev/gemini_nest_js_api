import { GoogleGenAI } from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';

interface Options {
  model?: string;
  systemInstruction?: string;
}

export const basicPromptStreamUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
) => {
  const files = basicPromptDto.files;
  console.log({ desdeUseCases: files });

  const {
    model = 'gemini-2.0-flash',
    systemInstruction = `
    - Responde unicamente en español.
    - Usa el formato markdown.
    `,
  } = options ?? {};

  const response = await ai.models.generateContentStream({
    model: model,
    contents: basicPromptDto.prompt,
    config: {
      systemInstruction,
    },
  });

  return response;
};
