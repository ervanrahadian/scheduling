import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";

@Entity()
export default class PublishedShift extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "date",
  })
  startDate: string;

  @Column({
    type: "date",
  })
  endDate: string;
}
