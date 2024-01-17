import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const californiaRoll = await prisma.menuItem.upsert({
        where: {name: 'California Roll'},
        update: {price: 5.99},
        create: {ingredients: ['avocado', 'crab', 'cucumber'],
        price: 5.99,
        name: 'California Roll',},
    })
    const phillyRoll = await prisma.menuItem.upsert({
        where: {name: 'Philly Roll'},
        update: {price: 9.99},
        create: {ingredients: ['salmon', 'cream cheese', 'cucumber'],
        price: 9.99,
        name: 'Philly Roll',},
    })
    const spicyTunaRoll = await prisma.menuItem.upsert({
        where: {name: 'Spicy Tuna Roll'},
        update: {price: 7.99},
        create: {ingredients: ['tuna', 'spicy sauce', 'cucumber'],
        price: 7.99,
        name: 'Spicy Tuna Roll',},
    })
    console.log({ californiaRoll})
    console.log({ phillyRoll })
    console.log({ spicyTunaRoll })

    const user = await prisma.user.upsert({
        where: {email: 'billy@gmail.com'},
        update: {},
        create: {
            email: 'billy@gmail.com',
            username: 'billy',
            password: 'password',
            name: 'billy',
        },  
    })
    console.log({ user })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})