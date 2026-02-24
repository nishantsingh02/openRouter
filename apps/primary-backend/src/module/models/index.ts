import Elysia from "elysia";
import { ModelsModel } from "./models";
import { ModelsService } from "./service";

export const app = new Elysia({ prefix: "/models" })
    .get("/", async () => {
        const models = await ModelsService.getModels();
        return {
            models
        }
    }, {
        response: {
            200: ModelsModel.getModelsResponseSchema
        }
    })
    .get("/providers", async () => {
        const providers = await ModelsService.getProviders();
        return {
            providers
        }
    }, {
        response: {
            200: ModelsModel.getProvidersResponseSchema
        }
    })
    // It fetches providers for a specific model. The is is the Models id
    .get("/:id/providers", async ({ params: { id } }) => {
        const providers = await ModelsService.getModelProviders(Number(id));
        return {
            providers
        }
    }, {
        response: {
            200: ModelsModel.getModelProvidersResponseSchema
        }
    })