const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://stefan_gg:****@cluster0-ptuut.mongodb.net/school?retryWrites=true&w=majority',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err)
//     })

// const Student = mongoose.model(
//     'student', new mongoose.Schema({
//         first_name: String,
//         last_name: String,
//         average_grade: Number,
//         courses: [String],
//         email: String,
//         birthday: Date
//     },
//     {
//         collection: 'students'
//     })
// )

// var s = new Student({
//     first_name : "Mitko", 
//     last_name : "Mitkovski", 
//     average_grade : 5.8, 
//     courses : [
//         "history", 
//         "english"
//     ], 
//     email : "stefan@hotmail.com", 
//     birthday : new Date("1995-12-15T00:00:00Z")
// })


// s.save(err => {
//     if(err) {
//         console.log('could not save student');
//         return;
//     }
//     console.log('student saved successful')
// }) 

mongoose.connect('mongodb+srv://stefan_gg:furious7@cluster0-ptuut.mongodb.net/expenses?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    })

const Product = mongoose.model(
    "product", new mongoose.Schema({
        name: String,
        type: String,
        description: String,
        date: Date,
        price: Number
    },
        {
            collection: "products"
        })
)

const prod = new Product({
    name: "Hamburger",
    type: "Food",
    description: "Fast food with a lot of calories",
    date: new Date("2019-05-15T00:00:00Z"),
    price: 120
})

prod.save(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("product saved")
})