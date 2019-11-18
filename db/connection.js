const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const uri = 'mongodb+srv://{username}:{password}@{host}/{dbname}?retryWrites=true&w=majority'

const initialize = (config) => {
    mongoose.connect(parseCString(config),
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

const parseCString = (config) => {
    var cs = uri.replace('{username}', config.username);
    cs = uri.replace('{password}', config.password);
    cs = uri.replace('{host}', config.host);
    cs = uri.replace('{dbname}', config.dbname);
    return cs;
}

module.exports = {
    initialize
}
