const mongoose = require('mongoose');
const { Shop } = require('./models/allModels')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}


const newShops = [
        {
            name: 'Gomex',
            address: 'Banatska bb',
            city: 'Zrenjanin'
        },
        {
            name: 'Roda',
            address: 'Sekspirova bb',
            city: 'Novi Sad'
        }
             
    ]
    
Shop.insertMany(newShops)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })