import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dot';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini Endpoints')
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

  @Post('basic-prompt-stream')
  @ApiOperation({ summary: 'Basic prompt stream' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The response from the basic prompt stream',
    type: String,
  })
  async basicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    const stream = await this.geminiService.basicPromptStream(basicPromptDto);
    res.setHeader('Content-Type', 'text/plain');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.text;
      console.log(piece);
      res.write(piece);
    }

    res.end();
    return res;
  }
}
