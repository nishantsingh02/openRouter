import { prisma } from "db"

const ONRAMP_AMOUNT = 1000;

export abstract class PaymentsService {

    static async onramp(userId: number) {
        const [user] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    credits: {
                        increment: ONRAMP_AMOUNT
                    }
                }
            }),
            prisma.onrampTranseaction.create({
                data: {
                    userId,
                    amount: ONRAMP_AMOUNT,
                    Status: "completed"
                }
            })
        ])

        return user.credits;
    }
}
