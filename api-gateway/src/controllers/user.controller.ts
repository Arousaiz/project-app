import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from 'src/common/dto/user/update_user.dto';
import { UpdateUserCredentialsDto } from 'src/common/dto/user/update_user_credentials.dto';
import { FindOneParams } from 'src/common/dto/find_one_params';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(
    private logger = new Logger('User Controller'),
    private readonly userService: UserService,
  ) {}

  // @UseGuards(AuthGuard) roles
  @Get('/users')
  async getUsers() {
    this.logger.log('Fetching users');
    return await this.userService.getUsers();
  }

  // @UseGuards(AuthGuard) roles
  @Get('/users/:id')
  async getUser(@Param('id') { id }: FindOneParams) {
    this.logger.log(`Fetching user with id ${id}`);
    return await this.userService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getUserProfile(@Request() req) {
    this.logger.log(`Fetching profile for user with id ${req.user.userId}`);
    return await this.userService.getUserProfile(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Put('/profile')
  async updateUser(@Request() req, @Body() user: UpdateUserDto) {
    this.logger.log(`Updating user with id ${req.user.userId}`);
    return await this.userService.updateUser(req.user.userId, user);
  }

  @UseGuards(AuthGuard)
  @Put('/profile/password')
  async updatePassword(@Request() req, @Body() user: UpdateUserCredentialsDto) {
    this.logger.log(`Updating credentials for user with id ${req.user.userId}`);
    return await this.userService.updateUserCredentials(req.user.userId, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/profile')
  async deleteUser(@Request() req) {
    this.logger.log(`Deleting user with id ${req.user.userId}`);
    return await this.userService.deleteUser(req.user.userId);
  }
}
