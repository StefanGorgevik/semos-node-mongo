const mongoose = require('mongoose');

const Film = mongoose.model(
    'film', new mongoose.Schema({
        ime: String,
        godina: Date,
        zanr: [String],
        rezija: String,
        oscar: Boolean,
        akteri: [String]
    },
        {
            collection: 'filmovi'
        })
);

const getAll = () => {
    return new Promise((success, fail) => {
        Film.find({}, (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const getOne = (id) => {
    return new Promise((success, fail) => {
        Film.findById(id, (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const save = (data) => {
    return new Promise((success, fail) => {
        var film = new Film(data)
        film.save(data, err => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const replace = (id, data) => {
    return new Promise((success, fail) => {
        Film.findByIdAndUpdate(id, {$set: {data}}, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const update = (id, data) => {
    return new Promise((success, fail) => {
        Film.findByIdAndUpdate(id, {$set: {data}}, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Film.findByIdAndRemove(id, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};


module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove
}