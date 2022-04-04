const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const { List, Shop, Category, Item } = require('./models/allModels')

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.get('/lists', async (req, res) => {
    const lists = await List.find({}).populate('shop');
    res.render('lists', { lists });
})

app.get('/lists/new', async (req, res) => {
    const shop = await Shop.find({});
    res.render('newList', { shop })
})

app.post('/lists', async (req, res) => {
    const newList = new List(req.body);
    await newList.save();
    res.redirect('/lists')
})

app.get('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id).populate('items');
    res.render('showList', { list })
})

app.get('/lists/:id/edit', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    const shop = await Shop.find({});
    res.render('editList', { list, shop })
})

app.patch('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findByIdAndUpdate(id, req.body, { runValidators: true});
    res.redirect(`/lists/${list._id}`);
})

app.get('/lists/:id/items/new', async (req, res) => {
    const { id } = req.params;
    const category = await Category.find({});
    res.render('newItem', { id, category })
})

app.post('/lists/:id/items', async(req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    const item = new Item(req.body);
    list.items.push(item);
    await list.save();
    await item.save();
    res.redirect(`/lists/${id}`)
})

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate('category');
    res.render('showItem', { item })
})

app.delete('/items/:id', async(req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/lists');
})

app.get('/items/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    const category = await Category.find({});
    res.render('editItem', { item, category })
})

app.patch('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true});
    res.redirect(`/items/${item._id}`);
})

app.get('/shops/new', (req, res) => {
    res.render('newShop');
})

app.post('/shops', async (req, res) => {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.redirect('/lists')
})

app.get('/categories/new', (req, res) => {
    res.render('newCategory');
})

app.post('/categories', async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.redirect('/lists')
})

app.listen(3000, () => {
    console.log("pokrenut server")
})