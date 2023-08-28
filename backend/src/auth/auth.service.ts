import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);

    if (user) {
      const { id, username, email } = user;
      return { id, username, email };
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username, email: user.email };
    user.accessToken = this.jwtService.sign(payload);
    return user;
  }
}
