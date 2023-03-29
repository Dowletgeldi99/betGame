import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNullOrUndefined } from 'util';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  async validate(name: string): Promise<boolean> {
    const user = await this.usersService.getUserByName(name);

    return isNullOrUndefined(user);
  }

  defaultMessage(): string {
    return 'The username «$value» is already register.';
  }
}
