import Database from "./modules/Database/main.js";

export default class Page {
    handleForm(form, event) {
        event.preventDefault();

        const formData = new FormData(form);

        const jsonObject = {};

        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        console.log(jsonObject)

        const jsonData = JSON.stringify(jsonObject);

        const instance = new Database();

        // instance.createProduct(jsonData)

        console.log(jsonData);
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM LOADED.')
            const form = document.querySelector('[data-form]')

            form.addEventListener('submit', (event) => this.handleForm(form, event));
        })
    }
}
// const handleForm = (form, event) => {
//     event.preventDefault();
//
//     const formData = new FormData(form);
//
//     const jsonObject = {};
//
//     formData.forEach((value, key) => {
//         jsonObject[key] = value;
//     });
//
//     console.log(jsonObject)
//
//     const jsonData = JSON.stringify(jsonObject);
//
//     const instance = new Database();
//
//     // instance.createProduct(jsonData)
//
//     console.log(jsonData);
//
// }

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM LOADED.')
//     const form = document.querySelector('[data-form]')
//
//     form.addEventListener('submit', (event) => handleForm(form, event));
// })