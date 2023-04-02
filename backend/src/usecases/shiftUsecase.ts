import * as shiftRepository from "../database/default/repository/shiftRepository";
import { Between, FindManyOptions, FindOneOptions } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift } from "../shared/interfaces";

export const find = async (opts: any): Promise<Shift[]> => {
  let params: { [condition: string]: any } = {};

  if (opts.startDate && opts.endDate) {
    params.where = {
      date: Between(opts.startDate, opts.endDate),
    };
  }

  if (opts.orderDate) {
    params.order = {
      date: opts.orderDate,
    };
  }

  if (opts.orderStartTime) {
    params.order = {
      ...params.order,
      startTime: opts.orderStartTime,
    };
  }

  return shiftRepository.find(params);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};

export const create = async (payload: ICreateShift): Promise<Shift> => {
  return new Promise<Shift>(async (resolve, reject) => {
    const shift = new Shift();
    shift.name = payload.name;
    shift.date = payload.date;
    shift.startTime = payload.startTime;
    shift.endTime = payload.endTime;

    let params: { [condition: string]: any } = {};

    if (payload.date) {
      params.where = {
        date: payload.date,
      };
    }

    let shiftData = await shiftRepository.find(params);

    if (shiftData?.length) {
      shiftData.map((single) => {
        const range1 = {
          start: new Date(
            2022,
            1,
            1,
            Number(payload.startTime.slice(0, 2)),
            Number(payload.startTime.slice(3, 5))
          ),
          end: new Date(
            2022,
            1,
            1,
            Number(payload.endTime.slice(0, 2)),
            Number(payload.endTime.slice(3, 5))
          ),
        };
        const range2 = {
          start: new Date(
            2022,
            1,
            1,
            Number(single.startTime.slice(0, 2)),
            Number(single.startTime.slice(3, 5))
          ),
          end: new Date(
            2022,
            1,
            1,
            Number(single.endTime.slice(0, 2)),
            Number(single.endTime.slice(3, 5))
          ),
        };

        let isClashing = range1.start < range2.end && range2.start < range1.end;

        console.log(isClashing);

        if (isClashing) {
          let error = {
            message: "Time is clashing!",
          };

          reject(error);
        } else {
          resolve(shiftRepository.create(shift));
        }
      });
    } else {
      resolve(shiftRepository.create(shift));
    }
  });
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  return shiftRepository.updateById(id, {
    ...payload,
  });
};

export const deleteById = async (id: string | string[]) => {
  return shiftRepository.deleteById(id);
};
