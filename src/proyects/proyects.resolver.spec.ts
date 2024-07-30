import { Test, TestingModule } from '@nestjs/testing';
import { ProyectsResolver } from './proyects.resolver';
import { ProyectsService } from './proyects.service';

describe('ProyectsResolver', () => {
  let resolver: ProyectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectsResolver, ProyectsService],
    }).compile();

    resolver = module.get<ProyectsResolver>(ProyectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
