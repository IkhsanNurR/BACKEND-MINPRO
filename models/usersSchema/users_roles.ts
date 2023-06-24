import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface users_rolesAttributes {
    usro_entity_id?: number;
    usro_role_id?: number;
    usro_modified_date?: Date;
}

@Table({
	tableName: "users_roles",
	schema: "users",
	timestamps: false 
})
export class users_roles extends Model<users_rolesAttributes, users_rolesAttributes> implements users_rolesAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('users.users_roles_usro_entity_id_seq'::regclass)") 
    })
    @Index({
    	name: "users_roles_pkey",
    	using: "btree",
    	unique: true 
    })
    	usro_entity_id?: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('users.users_roles_usro_role_id_seq'::regclass)") 
    })
    @Index({
    	name: "users_roles_pkey",
    	using: "btree",
    	unique: true 
    })
    	usro_role_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	usro_modified_date?: Date;

}