import { Server } from "@hapi/hapi";
import createShiftRoutes from "./shifts";
import createPublishedShiftRoutes from "./publishedShift";

export default function (server: Server, basePath: string) {
  createShiftRoutes(server, basePath + "/shifts");
  createPublishedShiftRoutes(server, basePath + "/published-shift");
}
