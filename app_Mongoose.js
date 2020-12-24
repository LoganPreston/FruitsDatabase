const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
mongoose.connect(url + "/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
      type:String,
      required:[true,"Missing Name"]
  },
  score: {
      type:Number,
      min:1,
      max:10
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit=new Fruit({
    name:"peach",
    score: 10,
    review:"peaches are max taste"
});

//fruit.save();

const pineapple=new Fruit({
    name:"pineapple",
    score:4,
    review:"good in a pinch"
})

//pineapple.save()

const mango=new Fruit({
    name:"mango",
    score:8,
    review:"YUM"
})

mango.save()

const peopleSchema=new mongoose.Schema({
    name: String,
    age:Number,
    favFruit:fruitSchema
});

const Person = mongoose.model("Person",peopleSchema);

const person=new Person({
    name:"Amy",
    age:12,
    favFruit:pineapple
});

Person.updateOne({name:"Logan"},{favFruit:mango},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log(("no err"));
    }
})
//person.save();
/*
Person.deleteMany({name:"Logan"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Logan deleted from DB");
    }
})
*/
//multiple adds


/*
const kiwi=new Fruit({
    name:"Kiwi",
    score: 10,
    review:"awesome fruit"
});
const orange=new Fruit({
    name:"Orange",
    score: 6,
    review:"eh fruit"
});
const banana=new Fruit({
    name:"Banana",
    score: 7,
    review:"strange fruit"
});


Fruit.insertMany([kiwi,orange,banana],function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log("successfully logged all fruits!");
    }
})
*/

Fruit.find(function(err,fruits){
    if ( err){
        console.log(err);
    }
    else{
        mongoose.connection.close()
        
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });
    }
});

Fruit.updateOne({name:"Pineapple"},{review:"Eh fruit"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Success!");
    }
})

Fruit.deleteOne({name:"peach"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("deleted!");
    }
})
