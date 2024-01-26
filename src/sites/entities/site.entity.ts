import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateSiteCommand {
  url: string;
  user: User;
}

@Entity()
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => User)
  user: User;

  static create(input: CreateSiteCommand) {
    const newSite = new Site();

    Object.assign(newSite, input);

    return newSite;
  }
}
