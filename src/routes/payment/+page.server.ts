import { redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database'
import { fail } from '@sveltejs/kit';

//load
export async function load({ cookies }) {
    const userId = cookies.get('userId');
    let userAddresses = null;
    let paymentMethods = null;
    if(userId){
        userAddresses = await db.getUserAddresses(parseInt(userId));
        paymentMethods = await db.getUserPaymentMethods(parseInt(userId));
    }
    return { addresses: userAddresses, paymentMethods: paymentMethods };
}

/** @type {import('./$types').Actions} */
export const actions = {
	order: async ({cookies, request}) => {
		const formData = await request.formData();
        const total = formData.get('total');
        // TODO: do i need to sanitize/auth this? submit from localstorage as form element maybe?
        const userId = cookies.get('userId');
        const subTotal = formData.get('subtotal');
        const fees = formData.get('fees');
        const calcedTip = formData.get('calcedTip');
        const cart = formData.get('cart');
        const savedAddress = formData.get('addressId');
        const savedPaymentMethod = formData.get('paymentMethodId');
        
        let address, city, state, zip, addressId;
        if (formData.get('newAddress') === 'true') {
            address = formData.get('address');
            city = formData.get('city');
            state = formData.get('state');
            zip = formData.get('zip');
            const addressResp = await db.createAddress({
                userId: userId,
                address: address,
                city: city,
                state: state,
                zip: zip,
            });
            addressId = addressResp.id;
            console.log("addressResp: " + JSON.stringify(addressResp));
            console.log("addressId: " + addressId);
        }

        if(savedAddress){
            console.log("savedAddress: ", savedAddress)
            console.log("saved address resolved to true");
        }

        // need to make this validation more mature
        if (!savedAddress && formData.get('newAddress') !== 'true') {
            return fail(400, { address, missing: true});
        }

        // TODO: if an address or payment option is not valid, the info that was entered should be returned to the form
        // i.e., if you forget an address, but you type in a new payment method, that info gets wiped

        // payment option creation/validation here
        let paymentMethodId;
        if (formData.get('newPaymentMethod') === 'true') {
            const paymentInfo = {
                userId: userId,
                cardNum: formData.get('cardNum'),
                expDate: formData.get('expDate'),
                cvv: formData.get('cvv'),
                zip: formData.get('zip'),
            };
            const paymentMethodResp = await db.createPaymentMethod(paymentInfo);
            paymentMethodId = paymentMethodResp.id;
            console.log("paymentMethodResp: " + JSON.stringify(paymentMethodResp));
        }

        if(savedPaymentMethod){
            console.log("savedPaymentMethod: ", savedPaymentMethod)
            console.log("saved payment method resolved to true");
        }

        const order = {
            userId: userId,
            total: total,
            subtotal: subTotal,
            fees: fees,
            calcedTip: calcedTip,
            cart: cart,
            addressId: savedAddress ? savedAddress : addressId,
            paymehtMethod: savedPaymentMethod ? savedPaymentMethod : paymentMethodId,
        };

        const orderResponse = await db.createOrder(order)
        console.log("Order after db: " + JSON.stringify(orderResponse));
        cookies.set("orderData", JSON.stringify(orderResponse));
        // TODO: if i have an existing address, i need to get it and return it here, otherwise can just return the address response above
        if(orderResponse.deliveryAddressId){
            const deliveryAddress = await db.getAddress(orderResponse.deliveryAddressId);
            return { order: orderResponse, cart: cart, address: deliveryAddress, success: true };
        }
        // TODO: some separate functionality for if it is a pickup order?
        return { order: orderResponse, cart: cart, success: true };
    }
};