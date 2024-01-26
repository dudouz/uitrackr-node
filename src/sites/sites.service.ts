import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
  ) {}
  async create(createSiteDto: CreateSiteDto) {
    const site = Site.create({
      url: createSiteDto.url,
      user: createSiteDto.user,
    });

    await this.siteRepository.save(site);

    return site;
  }

  findAll() {
    return `This action returns all sites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
