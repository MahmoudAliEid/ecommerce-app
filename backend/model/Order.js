const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Order = new mongoose.Schema({
    shippinglnfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderltems: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
    }, ],
    paymentlnfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        paidAt: {
            type: Date,
        },

        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxprice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalprice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "processing ",
        },
        delieverdAt: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
});

//Export the model
module.exports = mongoose.model("Order", Order);