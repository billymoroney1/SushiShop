import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const californiaRoll = await prisma.menuItem.upsert({
        where: {name: 'California Roll'},
        update: {price: 5.99},
        create: {ingredients: ['avocado', 'crab', 'cucumber'],
        price: 5.99,
        category: 'main-rolls',
        name: 'California Roll',},
    })
    const phillyRoll = await prisma.menuItem.upsert({
        where: {name: 'Philly Roll'},
        update: {price: 9.99},
        create: {ingredients: ['salmon', 'cream cheese', 'cucumber'],
        price: 9.99,
        category: 'main-rolls',
        name: 'Philly Roll',},
    })
    const spicyTunaRoll = await prisma.menuItem.upsert({
        where: {name: 'Spicy Tuna Roll'},
        update: {price: 7.99},
        create: {ingredients: ['tuna', 'spicy sauce', 'cucumber'],
        price: 7.99,
        category: 'main-rolls',
        name: 'Spicy Tuna Roll',},
    })
    console.log({ californiaRoll})
    console.log({ phillyRoll })
    console.log({ spicyTunaRoll })

    const water = await prisma.menuItem.upsert({
        where: {name: 'Water'},
        update: {price: 0.99},
        create: {ingredients: ['water'],
        price: 0.99,
        category: 'extras',
        name: 'Water',},
    })
    const mochi = await prisma.menuItem.upsert({
        where: {name: 'Mochi'},
        update: {price: 2.99},
        create: {ingredients: ['rice', 'sugar'],
        price: 2.99,
        category: 'extras',
        name: 'Mochi',},
    })
    const dumplings = await prisma.menuItem.upsert({
        where: {name: 'Dumplings'},
        update: {price: 4.99},
        create: {ingredients: ['flour', 'pork'],
        price: 4.99,
        category: 'extras',
        name: 'Dumplings',},
    })

    const user = await prisma.user.upsert({
        where: {email: 'billy@gmail.com'},
        update: {},
        create: {
            email: 'billy@gmail.com',
            username: 'billy',
            phone: '555-555-5555',
            password: 'password',
            firstName: 'billy',
            lastName: 'moroney',
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