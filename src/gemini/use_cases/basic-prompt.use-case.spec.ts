import { basicPromptUseCase } from './basic-prompt.use-case';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';
import { GoogleGenAI } from '@google/genai';

describe('basicPromptUseCase', () => {
  it('should call generateContent and return the response text', async () => {
    const generateContent = jest.fn().mockResolvedValue({ text: 'hola' });

    const aiMock = {
      models: { generateContent },
    } as unknown as GoogleGenAI;

    const dto: BasicPromptDto = { prompt: 'hola' };

    const result = await basicPromptUseCase(aiMock, dto);

    expect(result).toBe('hola');
    expect(generateContent).toHaveBeenCalledWith({
      model: 'gemini-2.0-flash',
      contents: dto.prompt,
      config: { systemInstruction: expect.any(String) },
    });
  });

  it('should return an empty string when no text returned', async () => {
    const generateContent = jest.fn().mockResolvedValue({});

    const aiMock = {
      models: { generateContent },
    } as unknown as GoogleGenAI;

    const dto: BasicPromptDto = { prompt: 'hola' };

    const result = await basicPromptUseCase(aiMock, dto);

    expect(result).toBe('');
  });
});
