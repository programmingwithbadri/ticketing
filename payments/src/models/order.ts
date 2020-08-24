import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from "@dev-ticketing/common";

// An interface that describes the properties
// that are required to create a new Order
interface OrderAttrs {
    id: string;
    status: OrderStatus;
    version: string;
    userId: string;
    price: number;
}

// An interface that describes the properties
// that a Order Document has
interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    version: string;
    userId: string;
    price: number;
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}
    , {
        toJSON: { // Overrides the default json serialization of User model
            transform(doc, ret) {
                ret.id = ret._id; // Return id instead of _id in response
                delete ret._id; // Remove  _id
            }
        }
    })

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        status: attrs.status,
        userId: attrs.userId,
        price: attrs.price
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order }
