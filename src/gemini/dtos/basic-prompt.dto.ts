import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BasicPromptDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hello, Gemini!',
    description: 'The prompt to be sent to the Gemini API',
  })
  prompt: string;
}
