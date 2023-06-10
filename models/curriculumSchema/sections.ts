import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface sectionsAttributes {
    sect_id?: number;
    sect_prog_entity_id: number;
    sect_title?: string;
    sect_decription?: string;
    sect_total_section?: number;
    sect_total_lecture?: number;
    sect_total_minute?: number;
    sect_modified_date?: Date;
}

@Table({
	tableName: "sections",
	schema: "curriculum",
	timestamps: false 
})
export class sections extends Model<sectionsAttributes, sectionsAttributes> implements sectionsAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('curriculum.section_sect_id_seq'::regclass)") 
    })
    @Index({
    	name: "sect_unique_id",
    	using: "btree",
    	unique: true 
    })
    @Index({
    	name: "section_pkey",
    	using: "btree",
    	unique: true 
    })
    	sect_id?: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "section_pkey",
    	using: "btree",
    	unique: true 
    })
    	sect_prog_entity_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	sect_title?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	sect_decription?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	sect_total_section?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	sect_total_lecture?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	sect_total_minute?: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	sect_modified_date?: Date;

}