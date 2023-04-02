import * as publishedShiftRepository from "../database/default/repository/publishedShiftRepository";
import { Between, FindManyOptions, FindOneOptions } from "typeorm";
import PublishedShift from "../database/default/entity/publishedShift";
import {
  ICreatePublishedShift,
  IUpdatePublishedShift,
} from "../shared/interfaces";

export const find = async (opts: any): Promise<PublishedShift[]> => {
  let params: { [condition: string]: any } = {};

  if (opts.startDate && opts.endDate) {
    params.where = {
      startDate: opts.startDate,
      endDate: opts.endDate,
    };
  }

  return publishedShiftRepository.find(params);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<PublishedShift>
): Promise<PublishedShift> => {
  return publishedShiftRepository.findById(id, opts);
};

export const create = async (
  payload: ICreatePublishedShift
): Promise<PublishedShift> => {
  const shift = new PublishedShift();
  shift.startDate = payload.startDate;
  shift.endDate = payload.endDate;

  return publishedShiftRepository.create(shift);
};

export const updateById = async (
  id: string,
  payload: IUpdatePublishedShift
): Promise<PublishedShift> => {
  return publishedShiftRepository.updateById(id, {
    ...payload,
  });
};

export const deleteById = async (id: string | string[]) => {
  return publishedShiftRepository.deleteById(id);
};
