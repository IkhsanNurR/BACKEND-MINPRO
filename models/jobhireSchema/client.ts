import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface clientAttributes {
    clit_id: number;
    clit_name?: string;
    clit_about?: string;
    clit_modified_date?: Date;
    clit_addr_id?: number;
    clit_emra_id?: number;
}

@Table({
	tableName: "client",
	schema: "jobhire",
	timestamps: false 
})
export class client extends Model<clientAttributes, clientAttributes> implements clientAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "client_pkey",
    	using: "btree",
    	unique: true 
    })
    	clit_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(256) 
    })
    @Index({
    	name: "client_clit_name_key",
    	using: "btree",
    	unique: true 
    })
    	clit_name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(512) 
    })
    	clit_about?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DATE,
    	defaultValue: Sequelize.literal("now()") 
    })
    	clit_modified_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	clit_addr_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	clit_emra_id?: number;

}