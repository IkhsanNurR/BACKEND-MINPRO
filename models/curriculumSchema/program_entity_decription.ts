import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface program_entity_decriptionAttributes {
    pred_entity_id: number;
    pred_item_learning?: object;
    pred_item_include?: object;
    pred_requirement?: object;
    pred_description?: object;
    pred_target_level?: object;
}

@Table({
	tableName: "program_entity_decription",
	schema: "curriculum",
	timestamps: false 
})
export class program_entity_decription extends Model<program_entity_decriptionAttributes, program_entity_decriptionAttributes> implements program_entity_decriptionAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "program_entity_decription_pkey",
    	using: "btree",
    	unique: true 
    })
    	pred_entity_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	pred_item_learning?: object;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	pred_item_include?: object;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	pred_requirement?: object;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	pred_description?: object;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	pred_target_level?: object;

}