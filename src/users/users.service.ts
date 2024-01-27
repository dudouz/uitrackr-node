import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user_exists = await this.userRepository
      .findOne({
        where: {
          email: createUserDto.email,
        },
      })
      .then((user) => user);

    if (user_exists) {
      return 'User already exists';
    }

    const encrypted_password = await User.hashPassword(createUserDto.password);

    const user = User.create({
      email: createUserDto.email,
      password: encrypted_password,
      name: createUserDto.name,
      plan: 'free',
      role: 'user',
    });

    await this.userRepository.save(user);

    return `User ${user.email} created successfully, you can login now`;
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
