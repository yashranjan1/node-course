import { describe } from "mocha"
import { expect } from "chai"
import { getUserById } from "../../controllers/users/handlers/get.handler"
import { create } from "../../controllers/users/handlers/create.handler"
import { deleteUserById } from "../../controllers/users/handlers/delete.handler"
import { updateUserById } from "../../controllers/users/handlers/update.handler"
import { User } from "../../controllers/users/handlers/user.store";
import { getList } from "../../controllers/users/handlers/getList.handler"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"

const userFixtures = [
	{
		name: "test1",
		email: "test-user+1@panenco.com",
		password: "password1",
	},
	{
		name: "test2",
		email: "test-user+2@panenco.com",
		password: "password2",
	},
];

describe("Handler tests", () => {
	describe("User Tests", () => {
        beforeEach(async () => {
            await prisma.user.deleteMany()
			await Promise.all(
				userFixtures.map(async (fixture) => {
					const hashedPassword = await bcrypt.hash(
						fixture.password,
						10
					);
					return prisma.user.create({
						data: {
							name: fixture.name,
							email: fixture.email,
							password: hashedPassword,
						},
					});
				})
			);
		});

		it("should test absolutely nothing", () => {
			expect(true).true
		})

        it("should get users", async() => {
            const res = await getList("")
            console.log(`test 2: ${JSON.stringify(res)}`)
            expect(res.some((x) => x.name === "test2")).true
        });

        it("should search users", async () => {
            const res = await getList("test1")

            expect(res.some((x) => x.name === "test1")).true;
        });

        it("should get user by id", async () => {
            const user = await prisma.user.findFirst({
                where: {
                    name: "test2"
                }
            })
            const res = await getUserById(user!.id);

            expect(res.name).equal("test2");
            expect(res.email).equal("test-user+2@panenco.com");
        });

        it("should fail when getting user by unknown id", async () => {
            try {
                const res = await getUserById("akasjdhfas");
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
        });

        it("should update user", async () => {
            const body = {
                email: "test-user+updated@panenco.com",
            } as User;
            const user = await prisma.user.findFirst({
                where: {
                    name: "test1"
                }
            })
            const id = user!.id
            const res = await updateUserById(id, body);

            expect(res.email).equal(body.email);
            expect(res.name).equal("test1");
            expect(res.email).equal(body.email);
        });

        it("should delete user by id", async () => {
            const initialCount = await prisma.user.count();
            const user = await prisma.user.findFirst()
            await deleteUserById(user!.id)

            const users = await prisma.user.findMany()

            expect(users.some((x) => x.id === user!.id)).false;
            expect(initialCount - 1).equal(await prisma.user.count());
        });
	});
});


