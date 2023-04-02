import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  DeleteResult,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import PublishedShift from "../entity/publishedShift";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const logger = moduleLogger("PublishedShiftRepository");

export const find = async (
  opts?: FindManyOptions<PublishedShift>
): Promise<PublishedShift[]> => {
  logger.info("Find");
  const repository = getRepository(PublishedShift);
  const data = await repository.find(opts);
  return data;
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<PublishedShift>
): Promise<PublishedShift> => {
  logger.info("Find by id");
  const repository = getRepository(PublishedShift);
  const data = await repository.findOne(id, opts);
  return data;
};

export const findOne = async (
  where?: FindConditions<PublishedShift>,
  opts?: FindOneOptions<PublishedShift>
): Promise<PublishedShift> => {
  logger.info("Find one");
  const repository = getRepository(PublishedShift);
  const data = await repository.findOne(where, opts);
  return data;
};

export const create = async (
  payload: PublishedShift
): Promise<PublishedShift> => {
  logger.info("Create");
  const repository = getRepository(PublishedShift);
  const newdata = await repository.save(payload);
  return newdata;
};

export const updateById = async (
  id: string,
  payload: QueryDeepPartialEntity<PublishedShift>
): Promise<PublishedShift> => {
  logger.info("Update by id");
  const repository = getRepository(PublishedShift);
  await repository.update(id, payload);
  return findById(id);
};

export const deleteById = async (
  id: string | string[]
): Promise<DeleteResult> => {
  logger.info("Delete by id");
  const repository = getRepository(PublishedShift);
  return await repository.delete(id);
};
