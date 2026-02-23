import { t } from "elysia";

export namespace ModelsModel {
    export const getModelsResponseSchema = t.Object({
        models: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            slug: t.String(),
            company: t.Object({
                id: t.String(),
                name: t.String(),
                website: t.String()
            })
        }))
    })

    export type getModelsResponseSchema = typeof getModelsResponseSchema.static;

    export const getProvidersResponseSchema = t.Object({
        providers: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            website: t.String()
        }))
    })

    export type getProvidersResponseSchema = typeof getProvidersResponseSchema.static;

    export const getModelProvidersResponseSchema = t.Object({
        providers: t.Array(t.Object({
            id: t.String(),
            providerId: t.String(),
            providerName: t.String(),
            providerWebsite: t.String(),
            inputTokenCost: t.Number(),
            outputTokenCost: t.Number()
        }))
    })

    export type getModelProvidersResponseSchema = typeof getModelProvidersResponseSchema.static;
}