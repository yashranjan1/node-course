import { User } from "../../controllers/users/handlers/user.store";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { before, beforeEach, after } from "mocha"
import { AppModule } from "../../app.module"
import {Test, TestingModule } from "@nestjs/testing";
import request from "supertest"
import { prisma } from "../../lib/prisma";

describe("Integration tests", () => {
	describe("User Tests", async () => {
		let app: INestApplication;

		before(async () => {
			const moduleFixture: TestingModule = await Test.createTestingModule(
				{
					imports: [AppModule],
				}
			).compile();

			app = moduleFixture.createNestApplication();

			app.useGlobalPipes(
				new ValidationPipe({
					whitelist: true,
					forbidNonWhitelisted: true,
					transform: true,
					transformOptions: { exposeUnsetFields: false },
				})
			);

			app.enableCors({
				origin: "*",
				credentials: true,
				exposedHeaders: ["x-auth"],
			});

			app.setGlobalPrefix("api");

            await prisma.$connect();

			await app.init();
		});
        
        beforeEach(() => {
            prisma.user.deleteMany()
        })

        after(async () => {
            await app.close()
        })

        it("should create a new user", async () => {
            const { body: createResponse } = await request(app.getHttpServer())
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .expect(HttpStatus.CREATED); 
        })   
        it("should get the newly created user by id", async () => {
            const { body: res } = await request(app.getHttpServer())
                .post(`/api/users`)
                .send({
                    name: "test",
                    email: "test-user+1@panenco.com",
                    password: "real secret stuff",
                } as User)

            const { body: loginResponse } = await request(app.getHttpServer())
                .post(`/api/auth/login`)    
                .send({
                    email: "test-user+1@panenco.com",
                    password: "real secret stuff",
                })
                .expect(HttpStatus.OK);

            const id = res.id
            const user = await request(app.getHttpServer())
                .get(`/api/users/${id}`)
                .send()
                .set("x-auth", loginResponse.token)
                .expect({
                    name: "test",
                    email: "test-user+1@panenco.com",
                    id: 0,
                })
            .expect(HttpStatus.OK)
        })

        it("should update the user", async () => {
            const { body: res } = await request(app.getHttpServer())
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 

            const { body: loginResponse } = await request(app.getHttpServer())
                .post(`/api/auth/login`)    
                .send({
                    email: "test-user+1@panenco.com",
                    password: "real secret stuff",
                })
                .expect(HttpStatus.OK);

            const id = res.id
            await request(app.getHttpServer())
            .patch(`/api/users/${id}`)
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "new password",
            })
            .set("x-auth", loginResponse.token)

            const user = await request(app.getHttpServer())
            .get(`/api/users/${id}`)
            .set("x-auth", loginResponse.token)
            .send()
            .expect({
                name: "test",
                email: "test-user+1@panenco.com",
                id: 0,
            })
            .expect(HttpStatus.OK)

        })
        it("should delete the user and make sure its not in the list", async () => {
            const { body: res } = await request(app.getHttpServer())
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 

            const { body: loginResponse } = await request(app.getHttpServer())
                .post(`/api/auth/login`)    
                .send({
                    email: "test-user+1@panenco.com",
                    password: "real secret stuff",
                })
                .expect(HttpStatus.OK);

            await request(app.getHttpServer())
            .delete(`/api/users/${res.id}`) 
            .set("x-auth", loginResponse.token)
            .expect(HttpStatus.NO_CONTENT)

            await request(app.getHttpServer())
            .get(`/api/users/${res.id}`)
            .set("x-auth", loginResponse.token)
            .expect(HttpStatus.NOT_FOUND)

            await request(app.getHttpServer())
            .get(`/api/users`)
            .set("x-auth", loginResponse.token)
            .expect([])
        })    
	});
});