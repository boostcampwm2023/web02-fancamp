import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.connection.remoteAddress;
    const domain = req.headers.host;
    console.log(`Request from ${ipAddress} at ${new Date()}`);
    console.log(`Requested domain: ${domain}`);
    console.log(
      `Request ${req.method} ${JSON.stringify(req.url)} ${JSON.stringify(
        req.body,
      )} ${req.ip} at ${new Date()}`,
    );
    next();
  }
}
