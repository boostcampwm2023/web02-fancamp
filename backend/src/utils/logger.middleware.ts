import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
      return next();
    }
    const domain = req.headers.host;
    // console.log(`Requested domain: ${domain}`, new Date());
    console.log(`Request time:`, new Date(), `IP: ${req.ip}`);
    console.log(`Request ${req.method} ${JSON.stringify(req.originalUrl)}`);
    console.log('Request', req.body);
    console.log();
    next();
  }
}
