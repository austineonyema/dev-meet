import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profiles.dto';
import type { Profile } from './profiles.interface';
import { UpdateProfileDto } from './dto/update-profiles.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfilesService {
  constructor(private config: ConfigService) {}

  private profiles: Profile[] = [
    {
      id: '59a61a13-2e60-4adb-8692-9aa04b873e25',
      name: 'It Works On My Machine',
      description: 'Backend dev. If it works on my machine, we’re halfway there.',
    },
    {
      id: '113ffcf6-cf10-40c7-b687-6fca8bd4795e',
      name: 'Production Survivor',
      description: 'I’ve seen production. We don’t talk about it, but I learned a lot.',
    },
    {
      id: '10755081-80b9-4c70-a184-906064cf9b3f',
      name: 'Commit Early Commit Often',
      description: 'I commit early, commit often, and occasionally regret both.',
    },
    {
      id: 'e1bb33fd-83e2-4740-a703-fe1539d005b3',
      name: '404 Sleep Not Found',
      description: 'Backend engineer running on caffeine, logs, and hope.',
    },
    {
      id: '9daf375c-cd3a-414f-8d62-80c7af4a3b4f',
      name: 'Monolith Whisperer',
      description: 'Breaking monoliths gently so nobody gets paged.',
    },
    {
      id: '96d691bb-a126-4c83-9831-41259477565d',
      name: 'Refactor Later',
      description: 'I’ll refactor later. Later is doing just fine.',
    },
    {
      id: '927861c8-8014-47ce-b1e4-0515f226d704',
      name: 'Rubber Duck Approved',
      description: 'Explains bugs to rubber ducks. Fixes them immediately after.',
    },
    {
      id: 'b905dbca-693d-49b0-a331-31f1f7243fec',
      name: 'Senior By Trauma',
      description: 'Senior backend dev, promoted by incidents not titles.',
    },
    {
      id: '4ad2e6f0-b708-43b6-b7eb-d0c7f2764424',
      name: 'Logs Over Feelings',
      description: 'I trust logs more than assumptions.',
    },
    {
      id: 'a48203bd-0157-4297-bad9-e45719e4070e',
      name: 'Works As Designed',
      description: 'That’s not a bug. It’s undocumented behavior.',
    },
    {
      id: '8aabc0cc-6a42-48fe-b690-5636ea7fa89f',
      name: 'Merge Conflict Therapist',
      description: 'Helping Git resolve its emotional issues.',
    },
    {
      id: 'ae04127e-436a-48a3-a0f6-f9e4afc7b766',
      name: 'Feature Flag Enthusiast',
      description: 'Shipping code safely behind flags and good intentions.',
    },
    {
      id: '20dc9fbf-ae54-4bde-937c-84bf8b900f2d',
      name: 'Ship Then Monitor',
      description: 'Deploy first. Watch dashboards intensely.',
    },
    {
      id: 'b44d6e37-356f-4297-a701-163f46731284',
      name: 'Bugs Fear Me',
      description: 'Fixing bugs I introduced with confidence.',
    },
    {
      id: 'f3fb1089-2d68-46d8-a2b5-ab90a710ca75',
      name: 'Dev Community Lurker',
      description: 'Here to meet other devs who’ve also said ‘quick fix’ before.',
    },
  ];

  /**
   * Retrieves all profiles.
   * @returns {Profile[]} An array of all profiles.
   */
  findAll(): Profile[] {
    return this.profiles;
  }

  findOne(id: string): Profile | false {
    const getIndex = this.profiles.findIndex((profile) => profile.id === id);
    if (getIndex === -1) return false;
    return this.profiles.find((value) => value.id === id);
  }

  create(profile: CreateProfileDto): Profile {
    const id = randomUUID();
    const userProfile = {
      id: id,
      ...profile,
    };
    this.profiles.push(userProfile);
    return { ...userProfile };
  }

  update(id: string, profile: UpdateProfileDto): Profile | false {
    const getIndex = this.profiles.findIndex((profile) => profile.id === id);
    if (getIndex === -1) return false;

    this.profiles[getIndex] = {
      ...this.profiles[getIndex],
      name: profile.name,
      description: profile.description,
    };
    return { ...this.profiles[getIndex] };
  }

  remove(id: string) {
    const getIndex = this.profiles.findIndex((profile) => profile.id === id);
    if (getIndex === -1) return false;

    this.profiles.splice(+getIndex, 1);
  }

  fetchUrl() {
    return this.config.get<string>('DATABASE_URL');
  }
}
