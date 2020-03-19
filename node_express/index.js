const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");


const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      "mongodb+srv://tatyana:YyHXdPRpN0f9wG94@cluster0-yxqel.mongodb.net/shop";
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
