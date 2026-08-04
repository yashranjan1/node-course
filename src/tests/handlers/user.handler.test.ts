import { describe } from "mocha"
import { expect } from "chai"
import { getList } from "../../controllers/users/handlers/getList.handler"
import { getUserById } from "../../controllers/users/handlers/get.handler"
import { create } from "../../controllers/users/handlers/create.handler"
import { deleteUserById } from "../../controllers/users/handlers/delete.handler"
import { updateUserById } from "../../controllers/users/handlers/update.handler"
import {Request, Response, NextFunction } from "express"
import { User, UserStore } from "../../controllers/users/handlers/user.store";



describe("Handler tests", () => {
	describe("User Tests", () => {
        before(() => {
            UserStore.users = [];
            UserStore.add({
                name: "test1",
                email: "test-user+1@panenco.com",
                password: "test",
            })
            UserStore.add({
                name: "test2",
                email: "test-user+2@panenco.com",
                password: "test",
            })
        })

		it("should test absolutely nothing", () => {
			expect(true).true
		})

        it("should get users", () => {
            const res = getList("")
            expect(res.some((x) => x.name === "test2")).true
        });

        it("should search users", () => {
            const res = getList("test1")

            expect(res.some((x) => x.name === "test1")).true;
        });

        it("should get user by id", () => {
            const res = getUserById(1);

            expect(res.name).equal("test2");
            expect(res.email).equal("test-user+2@panenco.com");
        });

        it("should fail when getting user by unknown id", () => {
            try {
                const res = getUserById(999);
            } catch (error : any) {
                expect(error.message).equal("User not found")
            }
        });

        it("should create user", async () => {
            const body = {
                email: "test-user+new@panenco.com",
                name: "newUser",
                password: "reallysecretstuff",
            } as User;
            const res = await create(body);

            expect(res.name).equal("newUser");
            expect(res.email).equal("test-user+new@panenco.com");
            expect(res.password).undefined;
        });

        it("should update user", async () => {
            const body = {
                email: "test-user+updated@panenco.com",
            } as User;
            const id = 0;
            const res = await updateUserById(id, body);

            expect(res.email).equal(body.email);
            expect(res.name).equal("test1");
            // @ts-ignore
            expect(UserStore.users.find((x) => x.id === id).email).equal(body.email);
        });

        it("should delete user by id", () => {
            const initialCount = UserStore.users.length;
            const res = deleteUserById(1);

            expect(UserStore.users.some((x) => x.id === 1)).false;
            expect(initialCount - 1).equal(UserStore.users.length);
        });
	});
});


