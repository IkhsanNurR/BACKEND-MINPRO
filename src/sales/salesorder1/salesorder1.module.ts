import { Module } from "@nestjs/common";
import { Salesorder1Service } from "./salesorder1.service";
import { Salesorder1Controller } from "./salesorder1.controller";

@Module({
  controllers: [Salesorder1Controller],
  providers: [Salesorder1Service],
})
export class Salesorder1Module {}
