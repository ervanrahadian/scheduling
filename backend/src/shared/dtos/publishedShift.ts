import Joi from "joi";

export const createPublishedShiftDto = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

export const updatePublishedShiftDto = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
