import { Prisma } from '@prisma/client';
import { CustomValidator as CV } from 'src/common/custom-validation.class';

export class SignUpDto implements Prisma.UserCreateInput {
  @CV.IsString()
  @CV.IsNotEmpty()
  readonly email: string;

  @CV.IsString()
  @CV.IsNotEmpty()
  readonly password: string;
}
