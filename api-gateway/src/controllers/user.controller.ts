import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from 'src/common/dto/user/update_user.dto';
import { UpdateUserCredentialsDto } from 'src/common/dto/user/update_user_credentials.dto';
import { FindOneParams } from 'src/common/dto/find_one_params';
import { UserService } from 'src/services/user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get users' })
  // @UseGuards(AuthGuard) roles
  @Get('/users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Get user' })
  // @UseGuards(AuthGuard) roles
  @Get('/users/:id')
  async getUser(@Param('id') { id }: FindOneParams) {
    return await this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getUserProfile(@Request() req) {
    return await this.userService.getUserProfile(req.user.userId);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @UseGuards(AuthGuard)
  @Put('/profile')
  async updateUser(@Request() req, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(req.user.userId, user);
  }

  @ApiOperation({ summary: 'Update user password' })
  @UseGuards(AuthGuard)
  @Put('/profile/password')
  async updatePassword(@Request() req, @Body() user: UpdateUserCredentialsDto) {
    return await this.userService.updateUserCredentials(req.user.userId, user);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(AuthGuard)
  @Delete('/profile')
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.user.userId);
  }
}
