import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource)
    await dataSource.synchronize(true)

    await app.init();
  });

  afterAll(async ()=>{
    const dataSource = app.get(DataSource);
    await dataSource.dropDatabase()
    await dataSource.destroy();
    await app.close()
  })

  describe('employees', () => {

    it('Should query findAllEmployees and return 0 employees', () => {
      return request(app.getHttpServer()).post('/graphql')
      .send({query: '{findAllEmployees{ id, name, dateStarted, proyects{ id, name, description }}}'})
      .expect((res)=>{
        expect(res.body.data.findAllEmployees).toEqual([])
        expect(res.body.data.findAllEmployees).toHaveLength(0)
      })
    });

    it('Should create a new employee using createEmployee mutation', ()=>{
      return request(app.getHttpServer()).post('/graphql')
      .send({query:'mutation{createEmployee(createEmployeeInput: {name: "testEmployee", dateStarted: "2022-10-10"}){ id, name, dateStarted}}'})
      .expect(200)
      .expect((res)=>{
        expect(res.body.data.createEmployee).toEqual({id:1,name: "testEmployee", dateStarted: "2022-10-10"})
      })
    })

  });

});
