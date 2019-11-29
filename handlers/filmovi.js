const modelFilmovi = require('../models/filmovi')

const getAll = (req, res) => {
    modelFilmovi.getAll(req.user.id)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

const getOne = (req, res) => {
    modelFilmovi.getOne(req.params.id, req.user.id)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

const save = (req, res) => {
    var film = req.body;
    let errors = 0;
    if(film.ime == undefined || film.ime.length == 0){errors++}
    if(film.rezija == undefined || film.rezija.length == 0){errors++}
    if(film.godina == undefined || film.godina.length == 0){errors++}
    if(film.zanr == undefined || film.zanr.length == 0){errors++}
    if(film.akteri == undefined || film.akteri.length == 0){errors++}
    if(film.oscar == undefined){errors++}
    if(errors == 0) {
        modelFilmovi.save({...film, user_id: req.user.id})
    .then(() => {
        res.status(201).send("Created");
    })
    .catch(err => {
        res.status(500).send(err);
    })
    } else {
        res.status(400).send("Bad request");
    }
}

const replace = (req, res) => {
    var film = req.body;
    let errors = 0;
    if(film.ime == undefined || film.ime.length == 0){errors++;}
    if(film.godina == undefined || film.godina.length == 0){errors++;}
    if(film.zanr == undefined || film.zanr.length == 0){errors++;}
    if(film.rezija == undefined || film.rezija.length == 0){errors++;}
    if(film.akteri == undefined || film.akteri.length == 0){errors++;}
    if(film.oscar == undefined){errors++;}
    if(errors == 0){
        modelFilmovi.replace(req.params.id, film)
        .then(() => {
            res.status(204).send('Item replaced');
        })
        .catch(err => {
            res.status(500).send(err);
        });
    } else {
        res.status(400).send('Bad request');
    }
}

const update = (req, res) => {
    var film = req.body;
    modelFilmovi.replace(req.params.id, film)
    .then(() => {
        res.status(201).send('Item updated');
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

const remove = (req, res) => {
    modelFilmovi.remove(req.params.id)
    .then(() => {
        res.status(204).send();
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove
}

