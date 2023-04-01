import { Body, Controller, Get, NotFoundException, Param, Post, Request, Response } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const user = this.usersService.create(body.email, body.password);
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if(!user) {
      throw new NotFoundException(`User  not found`);
    }
    return user;
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAll()
  }

}