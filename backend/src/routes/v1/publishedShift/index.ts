import { Server } from "@hapi/hapi";
import * as publishedShiftController from "./publishedShiftController";
import {
  createPublishedShiftDto,
  filterSchema,
  idDto,
  updatePublishedShiftDto,
} from "../../../shared/dtos";

export default function (server: Server, basePath: string) {
  server.route({
    method: "GET",
    path: basePath,
    handler: publishedShiftController.find,
    options: {
      description: "Get published shifts with filter",
      notes: "Get all published shifts if filter is not specified.",
      tags: ["api", "published"],
    },
  });

  server.route({
    method: "GET",
    path: basePath + "/{id}",
    handler: publishedShiftController.findById,
    options: {
      description: "Get published shift by id",
      notes: "Get published shift by id",
      tags: ["api", "published"],
      validate: {
        params: idDto,
      },
    },
  });

  server.route({
    method: "POST",
    path: basePath,
    handler: publishedShiftController.create,
    options: {
      description: "Create published shift",
      notes: "Create published shift",
      tags: ["api", "published"],
      validate: {
        payload: createPublishedShiftDto,
      },
    },
  });

  server.route({
    method: "PATCH",
    path: basePath + "/{id}",
    handler: publishedShiftController.updateById,
    options: {
      description: "Update published shift",
      notes: "Update published shift",
      tags: ["api", "published"],
      validate: {
        params: idDto,
        payload: updatePublishedShiftDto,
      },
    },
  });

  server.route({
    method: "DELETE",
    path: basePath + "/{id}",
    handler: publishedShiftController.deleteById,
    options: {
      description: "Delete published shift",
      notes: "Delete published shift",
      tags: ["api", "published"],
      validate: {
        params: idDto,
      },
    },
  });
}
