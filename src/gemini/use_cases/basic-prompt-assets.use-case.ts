import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
  Part,
} from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';

interface Options {
  model?: string;
  systemInstruction?: string;
}

export const basicPromptAssetsUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
): Promise<string> => {
  const {
    model = 'gemini-2.0-flash',
    systemInstruction = `
    - Responde unicamente en español.
    - Usa el formato markdown.
    `,
  } = options ?? {};

  const { prompt, files = [] } = basicPromptDto;

  const fileParts: Part[] = await Promise.all(
    files.map(async (file) => {
      const uploadedFile = await ai.files.upload({
        file: new Blob([file.buffer], { type: file.mimetype }),
      });

      return createPartFromUri(
        uploadedFile.uri ?? '',
        uploadedFile.mimeType ?? '',
      );
    }),
  );

  const response = await ai.models.generateContent({
    model: model,
    contents: [createUserContent([prompt, ...fileParts])],
    config: {
      systemInstruction,
    },
  });

  return response.text ?? '';
};
