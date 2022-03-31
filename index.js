const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const List = require('./models/list')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.get('/lists', async (req, res) => {
    const lists = await List.find({})
    res.render('lists', { lists })
})

app.get('/lists/new', (req, res) => {
    res.render('newList')
})

app.post('/lists', async (req, res) => {
    const newList = new List(req.body);
    await newList.save();
    res.redirect('/lists')
})

app.get('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    res.render('show', { list })
})

app.get('/lists/:id/edit', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    res.render('edit', { list })
})

app.put('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findByIdAndUpdate(id, req.body, { runValidators: true});
    res.redirect(`/lists/${id}`);
})

app.listen(3000, () => {
    console.log("pokrenut server")
})