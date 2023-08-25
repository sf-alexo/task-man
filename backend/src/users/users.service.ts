import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.input';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
      


async createUser(input: CreateUserInput): Promise<User> {
  const { username, email, password } = input;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = this.userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await this.userRepository.save(newUser); // Save the user to the database

  const payload = { username: savedUser.username, id: savedUser.id, email: savedUser.email };
  const accessToken = this.jwtService.sign(payload);

  // Attach accessToken to the savedUser object
  savedUser.accessToken = accessToken;

  return savedUser; // Return the savedUser object
}



  getUsers() {
    return this.userRepository.find();
  }
  findUsersById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

async validateUser(username: string, password: string): Promise<User> {
  console.log(`Validating user: ${username}`);
  const user = await this.userRepository.findOne({ where: { username } });

  if (!user) {
    console.log(`User not found: ${username}`);
    return null;
  }

  console.log(`Comparing passwords for user: ${username}`);
  const passwordsMatch = await user.comparePassword(password);
  if (passwordsMatch) {
    console.log(`Passwords match for user: ${username}`);
    return user;
  }

  console.log(`Passwords do not match for user: ${username}`);
  return null;
}

}