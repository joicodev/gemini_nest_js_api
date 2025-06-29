import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BasicPromptDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hello, Gemini!',
    description: 'The prompt to be sent to the Gemini API',
  })
  prompt: string;

  @ApiProperty({
    description: 'Array of files to be sent with the prompt',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @IsArray()
  @IsOptional()
  files?: Express.Multer.File[];
}