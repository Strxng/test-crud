import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly securityService: SecurityService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException(['As senhas não conferem!']);
    }

    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException([
        'Já existe um usuário cadastrado com esse email!',
      ]);
    }

    const cryptedPassword = this.securityService.cryptCreate(
      createUserDto.password,
    );

    const createdUser = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: cryptedPassword,
    });

    return createdUser;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  remove(id: number) {
    return this.userRepository.softDelete({
      id,
    });
  }
}
