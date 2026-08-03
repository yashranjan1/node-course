// create.handler.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { UserBody } from "../../../contracts/user.body";
import { UserStore } from "./user.store";
import { UserView } from "../../../contracts/user.view";

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Transform the plain object to an instance of our UserBody class
	const transformed = plainToInstance(UserBody, req.body);
	// Validate the transformed object and retrieve possible errors
	const validationErrors = await validate(transformed, {
		skipMissingProperties: false,
		whitelist: true,
		forbidNonWhitelisted: true,
	});
	// If errors were found, pass them to the express NextFunction
	if (validationErrors.length) {
		return next(validationErrors);
	}
	const user = UserStore.add(transformed);

	return res.json(plainToInstance(UserView, user));
};