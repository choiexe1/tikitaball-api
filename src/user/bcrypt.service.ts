import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hash(plainText: string) {
    return bcrypt.hashSync(plainText, 10);
  }

  compare(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
