import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @IsString({ message: 'A confirmação da senha deve ser uma string' })
  @IsNotEmpty({ message: 'A confirmação da senha é obrigatória' })
  confirmPassword: string;
}
