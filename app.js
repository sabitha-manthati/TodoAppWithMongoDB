const express = require('express')
const bodyParser = require('body-parser')
//const date=require(__dirname+ "/date.js")
const mongoose = require('mongoose');
const { log } = require('console');

const app = express();
//let items=['Buy Food','Cook Food','Eat Food'];
//let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://sabitha_manthati:Db@123@node.uwyj7.mongodb.net/todoDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })

const itemsSchema = {
    name: String
}
const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name: 'welcome to Todo list'
})
const item2 = new Item({
    name: "hit the +  button to add the a new  item"
})

const item3 = new Item({
    name: "<--hit this icon to delete the icon"
})

const defaultItems = [item1, item2, item3]

// Item.insertMany(defaultItems,function(err)
// {
//     if(err)
//     {
//         console.log(err)
//     }
//     else{
//         console.log("successfully saved default items")
//     }
// })
app.get("/", function (req, res) {
    //res.send("hello")
    // let cDay=today.getDay();
    // let day='';
    // if(cDay===6|| cDay==0)
    // { 
    //     day='weekend'

    // }
    // else{
    //     day='weekday'

    // }
    // switch(cDay)
    // {
    //           case 0:
    //           day='sunday';
    //           break;
    //           case 1:
    //           day='monday';
    //           break;
    //           case 2:
    //           day='tuesday';
    //           break;
    //           case 3:
    //           day='wednesday';
    //           break;
    //           case 4:
    //           day='thursday';
    //           break;
    //           case 5:
    //           day='firday';
    //           break;
    //           case 6:
    //           day='saturday';
    //           break;
    //           default:
    //               console.log("error currenet day is equal to :" +cDay)
    // }

    //  let today=new Date()
    // let options=
    // {
    //     weekday:'long',
    //     day:'numeric',
    //     month:'long',
    //     year:'numeric'
    // }

    // let day=today.toLocaleDateString("en-US",options)

    Item.find({}, function (err, foundItems) {
        //console.log(foundItems)
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("successfully saved default items")
                }
            })
           res.redirect("/")
        }
        else{
            res.render('list', { listTitle: "Today", newListItems: foundItems })
        }
       
    })



})

app.post('/', function (req, res) {
    const itemName = req.body.newItem
    const item=new Item({
        name:itemName
    })

    item.save()

    res.redirect("/")
    // if (req.body.list === 'work') {
    //     workItems.push(item)
    //     res.redirect('/work')
    // }
    // else {
    //     items.push(item)
    //     res.redirect('/')
    // }
    //console.log(item)
    //.push(item)

    //res.redirect('/')
})

app.post("/delete", function(req,res)
{
    const  checkedItemId=req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId,function(err)
    {
        if(!err)
        {
            console.log(' successfully deleted checked items  ')
            res.redirect("/")
        }
    })
})

app.get('/work', function (req, res) {
    res.render("list", { listTitle: "work list", newListItems: workItems })
})
app.post("/work", function (req, res) {
    let item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")

})

app.get("/about", function (req, res) {
    res.render('about')
})

app.listen(3003, function () {
    console.log('server started on port 3003')
})