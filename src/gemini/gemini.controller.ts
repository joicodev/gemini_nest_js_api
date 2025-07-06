import { Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * @description
   * Basic prompt
   *
   * @param {BasicPromptDto} basicPromptDto
   * @returns {Promise<string>}
   */
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

  /**
   * @description
   * Awesome prompt - improves the given prompt
   *
   * @param {BasicPromptDto} basicPromptDto
   * @returns {Promise<string>}
   */
  @Post('awesome-prompt')
  @ApiOperation({ summary: 'Awesome prompt - improves the given prompt' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The improved prompt response',
    type: String,
  })
  awesomePrompt(@Body() basicPromptDto: BasicPromptDto): Promise<string> {
    return this.geminiService.awesomePrompt(basicPromptDto);
  }

  /**
   * Basic prompt stream with file upload support
   * @param basicPromptDto 
   * @param res 
   * @param files 
   * @returns 
   */
  @Post('basic-prompt-stream')
  @ApiBody({ type: BasicPromptDto })  
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiProduces('application/octet-stream')
  @ApiOperation({ summary: 'Basic prompt stream with file upload' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Streaming text response from the basic prompt',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async basicPromptAssetsStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<void> { 
    basicPromptDto.files = files;
    const stream = await this.geminiService.basicPromptStream(basicPromptDto);
    res.setHeader('Content-Type', 'text/plain');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.text;
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
