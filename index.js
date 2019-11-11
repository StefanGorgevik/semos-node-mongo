const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://stefan_gg:furious7@cluster0-ptuut.mongodb.net/school?retryWrites=true&w=majority',
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

const Student = mongoose.model(
    'student', new mongoose.Schema({
        first_name: String,
        last_name: String,
        average_grade: String,
        courses: [String],
        email: String,
        birthday: Date
    },
    {
        collection: 'students'
    })
)

var s = new Student({
    first_name : "Mitko", 
    last_name : "Mitkovski", 
    average_grade : "5.8", 
    courses : [
        "history", 
        "english"
    ], 
    email : "stefan@hotmail.com", 
    birthday : new Date("1995-12-15T00:00:00Z")
})


s.save(err => {
    if(err) {
        console.log('could not save student');
        return;
    }
    console.log('student saved successful')
})