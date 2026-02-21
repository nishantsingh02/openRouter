import { t } from "elysia";

export namespace ApiKeyModel {
  // create api key schema
  export const createApiKeySchema = t.Object({
    name: t.String(),
  });
  export type createApiKeySchema = typeof createApiKeySchema.static;

  export const createApiKeyResponse = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });
  export type createApiKeyResponse = typeof createApiKeyResponse.static;

  // update api key schema
  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disable: t.Boolean()
  });
  export type updateApiKeySchema = typeof updateApiKeySchema.static;

  export const updateApiKeyResponse = t.Object({
    message: t.Literal("Disabling API-KEY successfully"),
  });
  export type updateApiKeyResponse = typeof updateApiKeyResponse.static;

  export const updateApiKeyFailedResponse = t.Object({
    message: t.Literal("Disabling API-KEY unsuccessfully")
  })
  export type updateApiKeyFailedResponse = typeof updateApiKeyFailedResponse.static;

  // get api key schema
  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        lastUsed: t.Nullable(t.Date()),
        creditConsumed: t.Number(),
      }),
    ),
  });
  export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;

  // delete api key schema
  export const deleteApiKeyResponse = t.Object({
    message: t.Literal("API-KEY deleted successfully"),
  });
  export type deleteApiKeyResponse = typeof deleteApiKeyResponse.static;

  export const deleteApiKeyFailedResponse = t.Object({
    message: t.Literal("Disabling API-KEY unsuccessfully")
  })
  export type deleteApiKeyFailedResponse = typeof deleteApiKeyFailedResponse.static;

}
