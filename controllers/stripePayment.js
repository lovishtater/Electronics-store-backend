const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');

exports.makepayment =(req, res) => {
    const {products , token} = req.body;
    console.log(product);

    let amount = 0;
    products.map(p => {
        amount += p.price;
    });
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: req.body.email,
        source: token,
    }).then(customer => {
        stripe.charges.create({ 
            amount:amount*100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: "Payment for " + token.card.name,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    state: token.card.address_state,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                },
            }
        }, {idempotencyKey})
        .then(result=> res.status(200).json(result))
        .catch(err => console.log(err));
});
};
