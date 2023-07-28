const Realm = require('realm');
// const { Product } = require('./Schemas/Product');
import {Product} from "./Schemas/Product.js";


export default class Database {

    async getProducts() {
        const realm = await Realm.open({ schema: [Product] });

        return realm.objects("Product");
    }

    getNewProductId() {
        this.getProducts().length;
    }

    async createProduct(product) {
        const realm = await Realm.open({ schema: [Product] });

        const { name, image, price, description } = product;

        realm.write(() => {
            realm.create(Product, {
                _id: this.getNewProductId + 1,
                name,
                image,
                price,
                description
            })
        })

        return realm;
    }
}

async function getProducts() {
    const realm = await Realm.open({ schema: [Product] });

    const products = realm.objects("Product");
}

async function createProduct(product) {
    const realm = await Realm.open({ schema: [Product] });

    realm.write(() => {
        realm.create(Product, {
            _id: "1",
            name: "Hamburguer",
            image: "https://img.freepik.com/fotos-gratis/hamburguer-saboroso-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1063.jpg?t=st=1690507214~exp=1690507814~hmac=c313d04f655dce53d686d4af8856fb0b74fbcfdc8b166c6a78e61e47cbe2dca1",
            price: 1.99,
            description: "Hamburguer de 150 gramas, com salada, queijo e maionese.",
        })
    })
}

async function initDB() {
}

// module.exports = { Database, ...module.exports };