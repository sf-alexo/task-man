import {
Body,
Controller,
Get,
Param,
ParseIntPipe,
Post,
UsePipes,
ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  
  @Get('id/:id')
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUsersById(id);
  }
  
}