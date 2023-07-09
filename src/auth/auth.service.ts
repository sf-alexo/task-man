import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
   // private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    //const payload = { username: user.username };
    //const accessToken = this.jwtService.sign(payload);
    let val;
    if (user) {
    	 val = 'token-hueken';
    } else {
    	 val = 'No token';
    };
    const accessToken = val;
    return { accessToken };
  }
}
