import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface employee_department_historyAttributes {
    edhi_id?: number;
    edhi_entity_id: number;
    edhi_start_date?: Date;
    edhi_end_date?: Date;
    edhi_modified_date?: Date;
    edhi_dept_id?: number;
}

@Table({
	tableName: "employee_department_history",
	schema: "hr",
	timestamps: false 
})
export class employee_department_history extends Model<employee_department_historyAttributes, employee_department_historyAttributes> implements employee_department_historyAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER,
    	defaultValue: Sequelize.literal("nextval('hr.employee_department_history_edhi_id_seq'::regclass)") 
    })
    @Index({
    	name: "employee_department_history_pkey",
    	using: "btree",
    	unique: true 
    })
    	edhi_id?: number;

    @Column({
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "employee_department_history_pkey",
    	using: "btree",
    	unique: true 
    })
    	edhi_entity_id!: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	edhi_start_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	edhi_end_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	edhi_modified_date?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	edhi_dept_id?: number;

}