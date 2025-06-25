import { Body, Controller, HttpStatus, Post, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';

import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

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
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async basicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const geminiStream = await this.geminiService.basicPromptStream(basicPromptDto);

    // Create a readable stream from the async generator
    const nodeStream = new Readable({
      read() {
        // This will be handled by the async generator
      }
    });

    // Set response headers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    // Process the async generator in the background
    (async () => {
      try {
        for await (const chunk of geminiStream) {
          const piece = chunk.text;
          console.log(piece);
          nodeStream.push(piece);
        }
        nodeStream.push(null); // End the stream
      } catch (error) {
        console.error('Streaming error:', error);
        nodeStream.destroy(error);
      }
    })();

    return new StreamableFile(nodeStream);
  }
}