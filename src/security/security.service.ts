import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class SecurityService {
  cryptCreate(data: string): string {
    console.log(bcrypt);
    return bcrypt.hashSync(data, 10);
  }

  cryptValidation(hash: string, data: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
}
