import { prisma } from "db"

const API_KEY_LENGTH = 20;
const ALPHABET_SET = "dbhsdfhsaasnhfjashdqoidhFASJBDFASBDFADSB12321455"

export abstract class ApiKeyService {

    static createRendomApiKey() {
        let suffixKey = ""
        for (let i = 0; i< API_KEY_LENGTH; i++) {
            suffixKey += ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)]
        }
        return `sk-or-v1-${suffixKey}`
    }

    static async createApiKey(name: string, userId: number ): Promise<{
        id: string,
        apiKey: string
    }> {
        const apiKey = ApiKeyService.createRendomApiKey();
        const apiKeyDb = await prisma.apiKey.create({
            data: {
                name,
                apiKey,
                userId
            }
        })

        return {
            id: apiKeyDb.id.toString(),
            apiKey: apiKeyDb.apiKey
        }
    }

    static async getApikeys(userId: number) {
        const apiKeys = await prisma.apiKey.findMany({
            where: {
                userId: userId,
                deleted: false // we only return that api key is not deleted
            }
        })
        return apiKeys.map(apiKey => ({
            id: apiKey.id.toString(),
            name: apiKey.name,
            lastUsed: apiKey.lastUsed,
            creditConsumed: apiKey.creditConsumed,
            apiKey: apiKey.apiKey
        }))
    }

    static async updateApiKeyDisabled(userId: number, apiKeyId: number, disable: boolean) {
        await prisma.apiKey.update({
            where: {
                id: apiKeyId,
                userId
            },
            data: {
                disabled: true
            }
        })
    }

    static async deleteApiKey(userId: number, apiKeyId: number) {
        await prisma.apiKey.update({
            where: {
                id: apiKeyId,
                userId
            }, 
            data: {
                deleted: true
            }
        })
    }


}