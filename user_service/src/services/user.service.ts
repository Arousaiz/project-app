import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { LoginUserInterface } from '../common/interfaces/login_user.interface';
import { ResponseUserInterface } from '../common/interfaces/response_user.interface';
import { UpdateUserInterface } from '../common/interfaces/update_user.interface';
import { UpdateUserCredentialsInterface } from '../common/interfaces/update_user_credentials.interface';
import { hashPassword, comparePassword } from '../common/util/hash';
import { CreateUserInterface } from '../common/interfaces/create_user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser({
    username,
    password,
  }: CreateUserInterface): Promise<ResponseUserInterface> {
    if (await this.findUserByUsername(username)) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password || !username) {
      throw new HttpException(
        'Credentials are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await hashPassword(password);
    const data = this.usersRepository.create({
      username: username,
      hashedPassword: hash,
    });
    const user = await this.usersRepository.save(data);
    return this.buildResponseUser(user);
  }

  async searchUserByCredentials({
    username,
    password,
  }: LoginUserInterface): Promise<ResponseUserInterface | null> {
    const user = await this.findUserByUsername(username);
    if (user) {
      if (await comparePassword(password, user.hashedPassword)) {
        return this.buildResponseUser(user);
      }
    }
    return null;
  }

  async findAllUsers(): Promise<ResponseUserInterface[]> {
    const users: User[] = await this.usersRepository.find();
    const data: ResponseUserInterface[] = users.map((user) =>
      this.buildResponseUser(user),
    );
    return data;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async getUserProfile(id: string): Promise<ResponseUserInterface> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.buildResponseUser(user);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async updateUser(
    id: string,
    user: UpdateUserInterface,
  ): Promise<ResponseUserInterface> {
    const data = await this.usersRepository.findOneBy({ id });
    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = await this.usersRepository.save({
      id: id,
      email: user.email ? user.email : data.email,
      firstName: user.firstName ? user.firstName : data.firstName,
      lastName: user.lastName ? user.lastName : data.lastName,
    });
    return this.buildResponseUser(updatedUser);
  }

  async updateUserByUsernameAndPassword(
    id: string,
    user: UpdateUserCredentialsInterface,
  ): Promise<ResponseUserInterface> {
    const data = await this.usersRepository.findOneBy({ id });
    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = await this.usersRepository.save({
      id: id,
      username: user.username ? user.username : data.username,
      hashedPassword: user.password
        ? await hashPassword(user.password)
        : data.hashedPassword,
    });

    return this.buildResponseUser(updatedUser);
  }

  buildResponseUser(user: User): ResponseUserInterface {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      contactNumber: user.contactNumber,
    };
  }
}
