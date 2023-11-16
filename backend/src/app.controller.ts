import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //TODO: 클라이언트 연결되면 삭제 ->
  @Get()
  getIndex(@Res() res: Response) {
    // index.html이 static 폴더에 위치한다면
    return res.sendFile(join(__dirname, '..', 'static', 'index.html'));
  }
  //<-
}
