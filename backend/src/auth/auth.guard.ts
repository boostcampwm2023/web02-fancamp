import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service'; // AuthService의 경로에 따라 수정하세요.

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const publicId = request.cookies && request.cookies['publicId'];
    if (!publicId) return false;

    const socket = context.switchToWs().getClient();
    // console.log(socket);

    // 여기에 실제 인증 로직을 추가하고 authService를 사용할 수 있습니다.
    const isAuthorized = this.authService.validateUser(publicId);
    return isAuthorized;
  }
}
