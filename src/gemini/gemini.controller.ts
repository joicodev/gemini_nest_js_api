import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dot';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('basic-prompt')
  @ApiOperation({ summary: 'Basic prompt' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The response from the basic prompt',
    type: String,
  })
  basicPrompt(@Body() basicPromptDto: BasicPromptDto): Promise<string> {
    return this.geminiService.basicPrompt(basicPromptDto);
  }
}
