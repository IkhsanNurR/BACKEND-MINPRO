import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface users_mediaAttributes {
    usme_id?: number;
    usme_entity_id: number;
    usme_filelink?: string;
    usme_filename?: string;
    usme_filesize?: number;
    usme_filetype?: string;
    usme_note?: string;
    usme_modified_date?: Date;
}

@Table({
	tableName: "users_media",
	schema: "users",
	timestamps: false 
})
export class users_media extends Model<users_mediaAttributes, users_mediaAttributes> implements users_mediaAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('users.users_media_usme_id_seq'::regclass)") 
    })
    @Index({
    	name: "users_media_pkey",
    	using: "btree",
    	unique: true 
    })
    	usme_id?: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "users_media_pkey",
    	using: "btree",
    	unique: true 
    })
    @Index({
    	name: "users_media_usme_entity_id_key",
    	using: "btree",
    	unique: true 
    })
    	usme_entity_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	usme_filelink?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	usme_filename?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	usme_filesize?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(15) 
    })
    	usme_filetype?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(55) 
    })
    	usme_note?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	usme_modified_date?: Date;

}