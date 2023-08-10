import { Controller, Get ,Post} from '@midwayjs/core';

@Controller('app')
export class appController {
  @Get('/tinymce')
  async tinymce(): Promise<string> {
    return 'tinymce';
  };

  @Post('/onlyoffice')
  async onlyoffice(): Promise<string> {
    return 'onlyoffice!';
  };
}
