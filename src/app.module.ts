import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
// import { CaslModule } from 'nest-casl';
// import { Roles } from './app.roles';

@Module({
  imports: [
    //   CaslModule.forRoot<Roles>({
    //   // Role to grant full access, optional
    //   superuserRole: Roles.admin,
    //   // Function to get casl user from request
    //   // Optional, defaults to `(request) => request.user`
    //   getUserFromRequest: (request) => request.currentUser,
    // }),
    UserModule, AbilityModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
