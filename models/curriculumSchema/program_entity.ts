import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface program_entityAttributes {
    prog_entity_id?: number;
    prog_title?: string;
    prog_headline?: string;
    prog_type?: string;
    prog_learning_type?: string;
    prog_rating?: string;
    prog_total_trainee?: number;
    prog_modified_date?: Date;
    prog_image?: string;
    prog_best_seller?: string;
    prog_price?: string;
    prog_language?: string;
    prog_duration?: number;
    prog_duration_type?: string;
    prog_tag_skill?: string;
    prog_city_entity_id?: number;
    prog_cate_id?: number;
    prog_create_by?: number;
    prog_status?: string;
    total_batch?: string;
    payment_type?: string;
    prog_regis_id?: string;
    prog_min_score?: number;
}

@Table({
	tableName: "program_entity",
	schema: "curriculum",
	timestamps: false 
})
export class program_entity extends Model<program_entityAttributes, program_entityAttributes> implements program_entityAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('curriculum.section_prog_entity_id_seq'::regclass)") 
    })
    @Index({
    	name: "program_entity_pkey",
    	using: "btree",
    	unique: true 
    })
    	prog_entity_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	prog_title?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(512) 
    })
    	prog_headline?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_type?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_learning_type?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DECIMAL 
    })
    	prog_rating?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_total_trainee?: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	prog_modified_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    	prog_image?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_best_seller?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DECIMAL 
    })
    	prog_price?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_language?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_duration?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_duration_type?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(512) 
    })
    	prog_tag_skill?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_city_entity_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_cate_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_create_by?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	prog_status?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	total_batch?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	payment_type?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	prog_regis_id?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	prog_min_score?: number;

}