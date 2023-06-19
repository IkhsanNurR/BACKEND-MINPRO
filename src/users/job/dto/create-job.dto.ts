import { talent_applyAttributes } from "models/jobhireSchema";

export class CreateJobDto implements talent_applyAttributes {
    taap_entity_id: number;
    taap_user_entity_id: number;
}
