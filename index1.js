const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://stefan_gg:furious7@cluster0-ptuut.mongodb.net/videoteka?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

const Klient = mongoose.model(
    'klient', new mongoose.Schema({
        ime: String,
        prezime: String,
        telefon: String,
        email: String,
        lozinka: String,
        lokacija: {
            ulica: String,
            broj: String,
            stan: String,
            grad: String,
            drzava: String,
            zip: String,
            gps: {
                lon: Number,
                lat: Number
            }
        },
        zanrovi: [String],
        _created: Date,
        _modified: Date
    },
        {
            collection: "klienti"
        }
    )
)

var k = new Klient({
        ime: "Janko",
        prezime: "Jankovski",
        telefon: +38979555666,
        email: "janko@jankovski.com",
        lozinka: "jankobe123",
        lokacija: {
            ulica: "na janko",
            broj: "54",
            stan: "vtoriot",
            grad: "Jankovo",
            drzava: "Makedonija",
            zip: "2323",
            gps: {
                lon: 3.14,
                lat: 3.14
            }
        },
        zanrovi: ["horor", "komedija"],
        _created: new Date(),
        _modified: new Date()
    }
);

// k.save(err => {
//     if(err) {
//         console.log("could not save klient");
//         return;
//     }
//     console.log('save successful')
// });

Klient.find({ "lokacija.grad": "Kumanovo", "zanrovi": "akcija" }, (err, data) => {    //params query and cb
    if(err) {
        console.log('could not be found');
        return;
    }
    data.forEach((k, i) => {
        console.log(k.ime, ' ', k.prezime, ' ', k.email, ' ', i)
    });
});   


// const Film = mongoose.model(
//     'filmovi', new mongoose.Schema({
//         ime: String,
//         godina: Date,
//         zanr: [String],
//         rezija: String,
//         oscar: Boolean,
//         akteri: [String]
//     },
//         {
//             collection: 'filmovi'
//         })
// );
//
// var newObject = new Film({
//     ime: 'aaa',
//     godina: new Date('2019-11-11T19:30:00Z'),
//     zanr: ["bbb", 'dd'],
//     rezija: 'test',
//     oscar: false,
//     akteri: ['ang', 'bill']
// }
// );

// newObject.save(err => {
//     if (err != null) {
//         console.log('could not save record');
//     }
// });

// Film.find({}, (err, data) => {
//     if (err) {
//         console.log('ERROR!');
//     }
//     console.log(data);
// });

// console.log('end!');