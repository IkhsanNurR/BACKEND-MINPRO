import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressTypeDto } from './create-address_type.dto';

export class UpdateAddressTypeDto extends PartialType(CreateAddressTypeDto) {}
