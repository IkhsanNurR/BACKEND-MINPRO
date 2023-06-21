import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface talentsAttributes {
    id?: number;
    talent_fullname?: string;
    talent_user_entity_id?: number;
    talent_technology?: string;
    talent_batch_id?: number;
    talent_start_date?: string;
    talent_end_date?: string;
    talent_trainer?: string;
    talent_skill?: string;
    talent_status?: string;
    talent_batch_name?: string;
}

@Table({
	tableName: "talents",
	schema: "bootcamp",
	timestamps: false 
})
export class talents extends Model<talentsAttributes, talentsAttributes> implements talentsAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('bootcamp.talent_id_seq'::regclass)") 
    })
    @Index({
    	name: "talent_pkey",
    	using: "btree",
    	unique: true 
    })
    	id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	talent_fullname?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	talent_user_entity_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	talent_technology?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	talent_batch_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
    })
    	talent_start_date?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
    })
    	talent_end_date?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	talent_trainer?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	talent_skill?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15),
    	defaultValue: Sequelize.literal("'idle'::character varying") 
    })
    	talent_status?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	talent_batch_name?: string;

}