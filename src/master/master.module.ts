import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { SkillTypeModule } from "./skill_type/skill_type.module";
import { SkillTemplateModule } from "./skill_template/skill_template.module";
import {
  address,
  category,
  city,
  country,
  modules,
  province,
  route_actions,
  skill_template,
  skill_type,
} from "models/masterSchema";
import { ModulesModule } from "./modules/modules.module";
import { RouteActionsModule } from "./route_actions/route_actions.module";
import { CategoryModule } from "./category/category.module";
import { CountryModule } from "./country/country.module";
import { ProvincesModule } from "./provinces/provinces.module";
import { CityModule } from "./city/city.module";
import { AddressModule } from "./address/address.module";
import { AddressTypeModule } from "./address_type/address_type.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    SkillTypeModule,
    SkillTemplateModule,
    ModulesModule,
    RouteActionsModule,
    CategoryModule,
    CountryModule,
    ProvincesModule,
    CityModule,
    AddressModule,
    AddressTypeModule,
  ],
})
export class MasterModule {}
