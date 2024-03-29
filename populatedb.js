const Item = require("./models/item");
const Category = require("./models/category");
const dotenv = require('dotenv').config()

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://" + dotenv.parsed.USERNAME + ":" + dotenv.parsed.PASSWORD + "@cluster0.y2sspz1.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(index, name, description, url) {
    const category = new Category({ name: name, description: description, url: url });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, category, description, price, quantity, url) {
    const item = new Item({ name: name, category: category, description: description, price: price, quantity: quantity, url: url });
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate(0, "Soccer", "soccer equipment", "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/e5974f32c2324455989ea7f500d2da7c_9366/tango-glider-ball.jpg"),
        categoryCreate(1, "Video Games", "video games equipment and games", "https://i.ebayimg.com/images/g/ZAwAAOSw1DtXD6~j/s-l1200.webp"),
    ]);
}

async function createItems() {
    console.log("Adding items");
    await Promise.all([
        itemCreate(0, "Soccer Ball", categories[0], "soccer ball used in world cup", 100.99, 5, "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/e5974f32c2324455989ea7f500d2da7c_9366/tango-glider-ball.jpg"),
        itemCreate(1, "Playstation 1", categories[1], "Playstation 1", 199.99, 2, "https://i.ebayimg.com/images/g/ZAwAAOSw1DtXD6~j/s-l1200.webp"),
        itemCreate(2, "Soccer Cleats", categories[0], "soccer cleats used by Messi", 80.99, 5, "https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-01-mens/334272420/nike-phantom-luna-ii-academy-lv8-fg-gn-bk-124-a-6545f404-b145-408e-bcb3-85e0a79d1080-jpgrendition.jpg?impolicy=gZoom"),
        itemCreate(3, "Playstation 5", categories[1], "Playstation 5", 499.99, 6, "https://m.media-amazon.com/images/I/51fM0CKG+HL._AC_SX342_SY445_.jpg"),
    ]);
}