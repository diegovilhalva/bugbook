import { createRouteHandler } from "uploadthing/next";
import { fileRoute } from "./core";

export const {GET,POST} = createRouteHandler({
    router:fileRoute
})