import Realm from "../../../node_modules/realm";

export class Product extends Realm.Object {
    static schema = {
        name: 'Product',
        primaryKey: "_id",
        properties: {
            _id: "string",
            name: "string",
            image: "string",
            price: "double",
            description: "string",
        },
    }
}

// module.exports = { Product };