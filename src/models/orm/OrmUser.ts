import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name: "users"
})
export class OrmUser {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_uuid: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_deleted: boolean;

    @Column()
    created: Date;
}
