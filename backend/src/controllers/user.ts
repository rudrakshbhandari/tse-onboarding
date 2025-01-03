import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import UserModel from "src/models/user";
import createHttpError from "http-errors";

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body;

  try {
    validationErrorParser(errors);

    const user = await UserModel.create({
      name: name,
      profilePictureURL: profilePictureURL,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (user == null) {
      throw createHttpError(404, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
