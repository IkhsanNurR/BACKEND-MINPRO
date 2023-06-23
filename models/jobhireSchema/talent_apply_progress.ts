import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface talent_apply_progressAttributes {
    tapr_id?: number;
    taap_user_entity_id: number;
    taap_entity_id: number;
    tapr_modified_date?: Date;
    tapr_status?: string;
    tapr_comment?: string;
    tapr_progress_name?: string;
}

@Table({
	tableName: "talent_apply_progress",
	schema: "jobhire",
	timestamps: false 
})
export class talent_apply_progress extends Model<talent_apply_progressAttributes, talent_apply_progressAttributes> implements talent_apply_progressAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('jobhire.talent_apply_progress_tapr_id_seq'::regclass)") 
    })
    @Index({
    	name: "talent_apply_progress_pkey",
    	using: "btree",
    	unique: true 
    })
    	tapr_id?: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "talent_apply_progress_pkey",
    	using: "btree",
    	unique: true 
    })
    	taap_user_entity_id!: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "talent_apply_progress_pkey",
    	using: "btree",
    	unique: true 
    })
    	taap_entity_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	tapr_modified_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	tapr_status?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	tapr_comment?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(55) 
    })
    	tapr_progress_name?: string;

}