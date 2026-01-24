import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profiles.dto';
import { ProfilesService } from './profiles.service';
import type { Profile } from './profiles.interface';
import { CreateProfileDto } from './dto/create-profiles.dto';
import type { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  //-------------------- Static Routes ----------------
  @Get()
  findAll(): Profile[] {
    return this.profilesService.findAll();
  }

  @Get('fetch')
  getUrl() {
    return this.profilesService.fetchUrl();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() profile: CreateProfileDto): Profile {
    return this.profilesService.create(profile);
  }

  // ------------------- Dynamic Routes ---------------
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID): Profile {
    const find = this.profilesService.findOne(id);
    if (!find) {
      throw new NotFoundException('user not found');
    }
    return find;
  }
  // postgres://postgres:postgres@localhost:51214/template1?sslmode=disable

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() profile: UpdateProfileDto): Profile {
    const updated = this.profilesService.update(id, profile);
    if (!updated) {
      throw new NotFoundException('user not found');
    }
    return updated;
  }

  @Delete(':id')
  @UseGuards(ProfilesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID): void {
    const deleted = this.profilesService.remove(id);
    if (!deleted) {
      throw new NotFoundException('user not found');
    }
  }
}
