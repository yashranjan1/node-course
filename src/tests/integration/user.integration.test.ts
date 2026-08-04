import { User, UserStore } from "../../controllers/users/handlers/user.store";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { before, beforeEach, after } from "mocha"
import { AppModule } from "../../app.module"
import {Test, TestingModule } from "@nestjs/testing";
import request from "supertest"

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

			await app.init();
		});
        
        beforeEach(() => {
            UserStore.users = [];
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
            .set("auth", "authHeader") 
            .expect(201); 
        })   
        it("should get the newly created user by id", async () => {
            const { body: res } = await request(app.getHttpServer())
            .post(`/api/users`)
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User)
            .set("auth", "authHeader")

            const id = res.id
            const user = await request(app.getHttpServer())
            .get(`/api/users/${id}`)
            .send()
            .set("auth", "authHeader")
            .expect({
                name: "test",
                email: "test-user+1@panenco.com",
                id: 0,
            })
        })
        it("should update the user", async () => {
            const { body: res } = await request(app.getHttpServer())
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .set("auth", "authHeader") 

            const id = res.id
            await request(app.getHttpServer())
            .patch(`/api/users/${id}`)
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "new password",
            })
            .set("auth", "authHeader")

            const user = await request(app.getHttpServer())
            .get(`/api/users/${id}`)
            .send()
            .set("auth", "authHeader")
            .expect({
                name: "test",
                email: "test-user+1@panenco.com",
                id: 0,
            })
        })
        it("should delete the user and make sure its not in the list", async () => {
            const { body: res } = await request(app.getHttpServer())
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .set("auth", "authHeader")

            await request(app.getHttpServer())
            .delete(`/api/users/${res.id}`) 
            .set("auth", "authHeader")
            .expect(204)

            await request(app.getHttpServer())
            .get(`/api/users/${res.id}`)
            .set("auth", "authHeader")
            .expect(404)

            await request(app.getHttpServer())
            .get(`/api/users`)
            .set("auth", "authHeader")
            .expect([])
        })    
	});
});