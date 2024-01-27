import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackingInput } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { Tracking } from './entities/tracking.entity';
import { Site } from 'src/sites/entities/site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SitesService } from 'src/sites/sites.service';
import { CreateSiteDto } from 'src/sites/dto/create-site.dto';

@Injectable()
export class TrackingsService {
  constructor(
    @InjectRepository(Tracking)
    private trackingRepository: Repository<Tracking>,
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(SitesService)
    private sitesService: SitesService,
  ) {}
  async create(input: CreateTrackingInput) {
    let site: Site;

    const user = await this.userRepository.findOne({
      where: {
        id: input.user,
      },
    });

    site = await this.siteRepository
      .findOne({
        where: {
          url: input.url,
          user: user,
        },
      })
      .then((site) => site);

    if (!site) {
      const createSiteInput: CreateSiteDto = {
        url: input.url,
        user: user,
      };

      try {
        site = await this.sitesService.create(createSiteInput);
      } catch (error) {
        throw error;
      }
    }

    const tracking = Tracking.create({
      user,
      site: site,
    });

    try {
      await this.trackingRepository.save(tracking);
    } catch (error) {
      throw error;
    }

    return `Tracking for url: ${tracking.site.url} added successfully. Status: ${tracking.status}`;
  }

  findAll() {
    return `This action returns all trackings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracking`;
  }

  update(id: number, updateTrackingDto: UpdateTrackingDto) {
    console.log(updateTrackingDto);
    return `This action updates a #${id} tracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
