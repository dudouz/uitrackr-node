import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { Tracking } from './entities/tracking.entity';
import { CreateSiteDto } from 'src/sites/dto/create-site.dto';
import { Site } from 'src/sites/entities/site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SitesService } from 'src/sites/sites.service';

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
  async create(createTrackingDto: CreateTrackingDto) {
    let site: Site;

    const user = await this.userRepository.findOne({
      where: {
        id: createTrackingDto.user,
      },
    });

    site = await this.siteRepository
      .findOne({
        where: {
          url: createTrackingDto.site_url,
        },
      })
      .then((site) => site);

    if (!site) {
      const createSiteInput: CreateSiteDto = {
        url: createTrackingDto.site_url,
        user,
      };

      try {
        site = await this.sitesService.create(createSiteInput);
      } catch (error) {
        return error;
      }
    }

    const tracking = Tracking.create({
      user,
      site: site,
    });

    try {
      await this.trackingRepository.save(tracking);
    } catch (error) {
      return error;
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
