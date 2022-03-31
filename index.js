const app = require('express')();
const path = require('path');

const mongoose = require('mongoose');
const List = require('./models/list')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/lists', async (req, res) => {
    const lists = await List.find({})
    res.render('lists', { lists })
})

app.get('/lists/new', (req, res) => {
    res.render('newList')
})

app.get('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    res.render('show', { list })
})

app.listen(3000, () => {
    console.log("pokrenut server")
})