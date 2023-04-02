import { Request, ResponseToolkit } from "@hapi/hapi";
import * as publishedShiftUsecase from "../../../usecases/publishedShiftUsecase";
import { errorHandler } from "../../../shared/functions/error";
import {
  ICreatePublishedShift,
  ISuccessResponse,
  IUpdatePublishedShift,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";

const logger = moduleLogger("publishedShiftController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find published shifts");
  try {
    const filter = req.query;
    const data = await publishedShiftUsecase.find(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get published shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const findById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find published shift by id");
  try {
    const id = req.params.id;
    const data = await publishedShiftUsecase.findById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get published shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const create = async (req: Request, h: ResponseToolkit) => {
  logger.info("Create published shift");
  try {
    const body = req.payload as ICreatePublishedShift;
    const data = await publishedShiftUsecase.create(body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create published shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const updateById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Update published shift by id");
  try {
    const id = req.params.id;
    const body = req.payload as IUpdatePublishedShift;

    const data = await publishedShiftUsecase.updateById(id, body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Update published shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const deleteById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Delete published shift by id");
  try {
    const id = req.params.id;
    const data = await publishedShiftUsecase.deleteById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Delete published shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};
