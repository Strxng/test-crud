import { Injectable } from '@nestjs/common';
import { SecurityService } from 'src/security/security.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityService: SecurityService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isTheSamePassword = this.securityService.cryptValidation(
      user.password,
      password,
    );

    if (!isTheSamePassword) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      accessToken: `Bearer ${token}`,
    };
  }
}
