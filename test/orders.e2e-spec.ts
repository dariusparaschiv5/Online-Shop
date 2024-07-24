import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('OrdersController E2E Test', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/logIn')
      .send({ username: 'adminusername', password: 'adminpass' });

    token = response.body.accessToken;
  });

  it('should create a new order succesfully', async () => {
    const orderPaylod = {
      customerId: '7d8ea3ba-faa7-4acb-be1c-66232ebceb99',
      orderDetails: [
        {
          productId: 'e387eb1a-9424-400c-83f8-8fe463ae29b8',
          locationId: 'a92ebda9-2576-4de3-af63-c794f6e7a29c',
          quantity: 2,
        },
      ],
    };
    const res = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPaylod)
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('should fail to create a new order due to missing stock', async () => {
    const orderPayload = {
      customerId: '7d8ea3ba-faa7-4acb-be1c-66232ebceb99',
      orderDetails: [
        {
          productId: 'e387eb1a-9424-400c-83f8-8fe463ae29b8',
          locationId: 'a92ebda9-2576-4de3-af63-c794f6e7a29c',
          quantity: 400,
        },
      ],
    };
    await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPayload)
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
