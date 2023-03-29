import { IsDefined, IsString, Validate } from 'class-validator';
import { IsUserAlreadyExist } from '../../users/UserExists';

export class SignUpDto {
  @IsDefined()
  @IsString()
  @Validate(IsUserAlreadyExist)
  readonly name: string;
}
