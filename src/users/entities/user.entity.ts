import { Site } from 'src/sites/entities/site.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

interface CreateUserCommand {
  name: string;
  email: string;
  password: string;
  role: string;
  plan: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  plan: string;

  @OneToMany(() => Site, (site) => site.user)
  sites: Site[];

  static create(input: CreateUserCommand) {
    const newUser = new User();

    Object.assign(newUser, input);

    newUser.role = 'user';
    newUser.plan = 'free';

    return newUser;
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
