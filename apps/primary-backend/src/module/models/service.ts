import { prisma } from "db"

export abstract class ModelsService {

    static async getModels() {
        const models = await prisma.model.findMany({
            include: {
                company: true
            }
        })

        return models.map(model => ({
            id: model.id.toString(),
            name: model.name,
            slug: model.slug,
            company: {
                id: model.company.id.toString(),
                name: model.company.name,
                website: model.company.website
            }
        }))
    }

    static async getProviders() {
        const providers = await prisma.provider.findMany()

        return providers.map(provider => ({
            id: provider.id.toString(),
            name: provider.name,
            website: provider.website
        }))
    }

    static async getModelProviders(modelId: number) {
        const mappings = await prisma.modelProviderMapping.findMany({
            where: {
                modelId
            },
            include: {
                provider: true
            }
        })

        return mappings.map(mapping => ({
            id: mapping.id.toString(),
            providerId: mapping.provider.id.toString(),
            providerName: mapping.provider.name,
            providerWebsite: mapping.provider.website,
            inputTokenCost: mapping.inputTokenCost,
            outputTokenCost: mapping.outputTokenCost
        }))
    }
}