import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @param {any} email
 * @param {any} password
 */
export async function register(email: string, password: string){
    const user = await prisma.user.create({
        data: {
            email: email,
            username: 'billy',
            password: password,
            name: 'billy',
        },
    }).then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
    console.log(user)
    return user;
}

export async function createOrder(items: any){
    const order = await prisma.order.create({
        data: {
            items: {
                create: items
            }
        }
    })
    return order;
}

export async function login(email: string, password: string){
    const user = await prisma.user.findFirst({
        where: {
            AND: {
                email: {
                    equals: email,
                },
                password: {
                    equals: password,
                }
            }
        }
    })
    console.log(user)
    return user;
}

export async function getMenuItems(){
    const menuItems = await prisma.menuItem.findMany();
    console.log(menuItems)
    return menuItems;
}