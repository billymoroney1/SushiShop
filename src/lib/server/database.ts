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

// TODO: some kind of validation so that user cant remake same address?
export async function createAddress(addressInfo: any){
    console.log("addressInfo: " + JSON.stringify(addressInfo));
    const address = await prisma.deliveryAddress.create({
        data: {
            User:
            {
                connect: {
                    id: parseInt(addressInfo.userId),
                }
            },
            address: addressInfo.address,
            city: addressInfo.city,
            state: addressInfo.state,
            zip: addressInfo.zip,
        }
    })
    console.log("address: " + JSON.stringify(address));
    return address;
}

// TODO: validate so this works like a real credit card validation?
export async function createPaymentMethod(paymentInfo: any){
    console.log("paymentInfo: " + JSON.stringify(paymentInfo));
    const paymentMethod = await prisma.paymentMethod.create({
        data: {
            User:
            {
                connect: {
                    id: parseInt(paymentInfo.userId),
                }
            },
            cardNum: paymentInfo.cardNum,
            expDate: paymentInfo.expDate,
            cvv: paymentInfo.cvv,
            zip: paymentInfo.zip,
        }
    })
    console.log("paymentMethod: " + JSON.stringify(paymentMethod));
    return paymentMethod;
}

export async function getAddress(addressId: number){
    const address = await prisma.deliveryAddress.findFirst({
        where: {
            id: addressId,
        }
    })
    console.log(address)
    return address;
}

export async function getUserAddresses(userId: number){
    const addresses = await prisma.deliveryAddress.findMany({
        where: {
            userId: userId,
        }
    })
    console.log(addresses)
    return addresses;
}

export async function getUserPaymentMethods(userId: number){
    const paymentMethods = await prisma.paymentMethod.findMany({
        where: {
            userId: userId,
        }
    })
    console.log(paymentMethods)
    return paymentMethods;
}

export async function createOrder(orderInfo: any){
    console.log("orderInfo: " + JSON.stringify(orderInfo));
    const order = await prisma.order.create({
        data: {
            User: {
                connect: {
                    id: parseInt(orderInfo.userId),
                }
            },
            address: {
                connect: {
                    id: parseInt(orderInfo.addressId)
                }
            },
            status: 'preparing',
            total: parseFloat(orderInfo.total),
            subtotal: parseFloat(orderInfo.subtotal),
            fees: parseFloat(orderInfo.fees),
            calcedTip: parseFloat(orderInfo.calcedTip),
        }
    })

    for (const item of JSON.parse(orderInfo.cart)){
        // TODO: put comments/special instructions, additions, removals
        const orderItem = await prisma.orderItem.create({
            data: {
                orderId: order.id,
                menuItemId: item.id,
                additions: item.additions,
                comments: item.comments,
                quantity: item.count,
            }
        })
    }

    return order;
}

export async function getOrderItems(orderId: number){
    const orderItems = await prisma.orderItem.findMany({
        where: {
            orderId: orderId,
        }
    })
    return orderItems;
}

export async function getUserOrders(userId: number){
    const orders = await prisma.order.findMany({
        where: {
            userId: userId,
        }
    })
    return orders;
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

export async function getExtraItems(){
    const extraItems = await prisma.extraItem.findMany();
    console.log(extraItems)
    return extraItems;
}

export async function getUser(userId: number){
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        }
    })
    return user;
}