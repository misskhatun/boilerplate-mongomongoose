require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user:qrnw4uBf6f3RWKnT@cluster0.nl8r4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const kha = new Person({
    name: "Prity Khatun",
    age: 20,
    favoriteFoods: ["noodles", "rice", "memes"]
  });
kha.save(function(err, data) {
    if (err) return done(err);
    done(null , data);
  })
};
const arrayOfPeople = [
  {name: "Mia", age: 20, favoriteFoods: ["Romen"]},
  {name: "Emi", age: 26, favoriteFoods: ["Rice"]},
  {name: "Brian", age: 25, favoriteFoods: ["Chicken"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);});
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "biriyani";
  Person.findById({_id: personId}, (err, data) => {
    if (err) return done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      done(null, data);
    })
  })};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, 
  (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Lila";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "taco";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
