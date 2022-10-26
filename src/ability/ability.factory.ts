import { InferSubjects, ExtractSubjectType, AbilityBuilder, Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity';

export enum Action {
    Mange = 'mange', // wildcard for any action
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

export type Subject = InferSubjects<typeof User> | 'all' // all is a wildcard for any action
// export type Subject = InferSubjects<typeof User | typeof Post> | 'all'

export type AppAbility = Ability<[Action, Subject]> | 'all' // all is a wildcard for any action

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        // define the rules 
        // const builder = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
        const { can, cannot, build } = new AbilityBuilder(Ability)
        // const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
        // builder.can('test', 'all')
        // builder.can(Action.Read, 'all')
        // builder.can(Action.Read, User)
        if (user.isAdmin) {
            // builder.can(Action.Mange, 'all')
            can(Action.Read, User)
            can(Action.Delete, User)
            can(Action.Update, User)
            can(Action.Create, User)
            // not equal
            cannot(Action.Mange, User, { orgId: { $ne: user.orgId } }).because('u cant mange orgId')
        } else {
            // builder.can(Action.Read, User)
            can(Action.Read, User)
            cannot(Action.Create, User).because('not a admin y gad3')
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subject>
        })
    }
}
