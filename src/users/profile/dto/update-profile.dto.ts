import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    newPassword?: string;
    retypePassword?: string;
    newEmail?: string
    newPhone?: string
    newPontyCode?: string
    newAddressLine1?: string
    newAddressLine2?: string
    newAddressPostalCode?: string
    newAddressCityId?: number
    newAddressTypeId?: number
    newSchool?: string
    newDegree?: string
    newFieldStudy?: string
    newStartDate?: Date
    newEndDate?: Date
    newGrade?: string
    newActivitis?: string
    newDescription?: string
    newTitle?: string
    newHeadline?: string
    newCompany: string
    newCity?: number
    newIndustry?: string
    newEmployeType?: string
    newExperienceType?: string
    newSkill?: string
}
