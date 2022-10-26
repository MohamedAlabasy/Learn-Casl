import { Controller, Get, ForbiddenException, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
// import {  Action,defineAbilityFor } from 'src/ability/ability.factory';
import { User } from './entities/user.entity';
import { CheckAbility } from 'src/ability/ability.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = {
      id: 1,
      isAdmin: true,
      orgId: 1
    }
    const ability = this.abilityFactory.defineAbility(user)

    const isAllowed = ability.can(Action.Create, User)
    if (!isAllowed) {
      throw new ForbiddenException('not admin')
    }
    // or user if exception filter 
    // ForbiddenError.from(ability).setMessage('not admin').throwUnlessCan(Action.Create, User)
    // if you add message 
    // ForbiddenError.from(ability).throwUnlessCan(Action.Create, User)


    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Delete, subject: User }) // not protect route just pring data
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
