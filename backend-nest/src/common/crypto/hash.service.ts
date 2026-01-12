import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
      const hashedContent = bcrypt.hash(plain, this.saltRounds);
      if (!hashedContent) {
          throw new InternalServerErrorException("Falha ao gerar o hash");
      }
    return hashedContent;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}