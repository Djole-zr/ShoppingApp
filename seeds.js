const mongoose = require('mongoose');
const { List } = require('./models/allModels')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}


const newLists = [
        {
            name: 'ponedeljak',
            shop: '624aef1770d0158eacad8a05'
        },
        {
            name: 'utorak',
            shop: '624aef1770d0158eacad8a05'
        }  
    ]
    
List.insertMany(newLists)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })