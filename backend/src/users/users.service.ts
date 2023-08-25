import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
      
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    const payload = { username: newUser.username, id: newUser.id, email: newUser.email };
    const accessToken = this.jwtService.sign(payload);

    // Attach accessToken to the newUser object
    newUser.accessToken = accessToken;

    return newUser;
  }

  getUsers() {
    return this.userRepository.find();
  }
  findUsersById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && await user.comparePassword(password)) {
      return user;
    }

    return null;
  }
}