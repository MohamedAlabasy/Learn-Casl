import { SetMetadata } from '@nestjs/common'
import { Action, Subject } from './ability.factory'

export interface RequireRule {
    action: Action;
    subject: Subject;
}

export const CHECK_ABILITY = 'check_ability'

export const CheckAbility = (..._requirements: RequireRule[]) => SetMetadata(CHECK_ABILITY, _requirements)