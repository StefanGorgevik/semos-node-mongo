const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const initialize = () => {
    mongoose.connect('mongodb+srv://stefan_gg:furious7@cluster0-ptuut.mongodb.net/videoteka?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(res => {
           // console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    initialize
}
