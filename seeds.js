const mongoose = require('mongoose');
const List = require('./models/list')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}


const newLists = [
        {
            name: 'ponedeljak',
            shop: 'Gomex',
            items: ['jaja', 'kupus', 'kola']
        },
        {
            name: 'utorak',
            shop: 'Gomex',
            items: ['kola', 'pivo']
        },
        {
            name: 'sreda',
            shop: 'Roda',
            items: ['deterdzent', 'grasak', 'mleko', 'pivo']
        }        
    ]
    
List.insertMany(newLists)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })