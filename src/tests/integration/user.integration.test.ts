import { UserStore } from "../../controllers/users/handlers/user.store";
import { User } from "../../controllers/users/handlers/user.store";
import supertest from "supertest"
import { App } from "../../app";

describe("Integration tests", () => {
	describe("User Tests", async () => {
		let request: any;
		beforeEach(() => {
			UserStore.users = [];
			const app = new App();
			request = supertest(app.host);
		});

        it("should create a new user", async () => {
            const { body: createResponse } = await request
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .set("auth", "authHeader") 
            .expect(200); 
        })   
        it("should get the newly created user by id", async () => {
            const { body: res } = await request
            .post(`/api/users`)
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User)
            .set("auth", "authHeader")

            const id = res.id
            const user = await request
            .get(`/api/users/${id}`)
            .send()
            .set("auth", "authHeader")
            .expect({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
                id: 0,
            })
        })
        it("should update the user", async () => {
            const { body: res } = await request
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .set("auth", "authHeader") 

            const id = res.id
            await request
            .patch(`/api/users/${id}`)
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "new password",
            })
            .set("auth", "authHeader")

            const user = await request
            .get(`/api/users/${id}`)
            .send()
            .set("auth", "authHeader")
            .expect({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "new password",
                id: 0,
            })
        })
        it("should delete the user and make sure its not in the list", async () => {
            const { body: res } = await request
            .post(`/api/users`) 
            .send({
                name: "test",
                email: "test-user+1@panenco.com",
                password: "real secret stuff",
            } as User) 
            .set("auth", "authHeader")

            await request
            .delete(`/api/users/${res.id}`) 
            .set("auth", "authHeader")
            .expect(204)

            await request.get(`/api/users/${res.id}`).set("auth", "authHeader").expect(404)
            await request
            .get(`/api/users`)
            .set("auth", "authHeader")
            .expect([])
        })    
	});
});