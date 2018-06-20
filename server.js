const express = require('express');
const app = express();
const logger = require('morgan');
const knex = require('./db/index.js');
const bodyParser = require('body-parser');
const store = require('./store.js');
const { check, validationResult, body } = require('express-validator/check')
// app.set('view engine','ejs');
app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/hello-world', (req, res) => {
    res.send({express: 'heyddd'});
    // res.render('index');
} )

app.get('/restaurants', (req, res) => {
    knex('restaurants').select().then( restaurants => res.send(restaurants) );
})

app.get('/restaurants/:id', (req, res) => {
    knex('restaurants').where({id: req.params.id}).first().then( restaurant => res.send(restaurant) );
})

app.post('/eval_rest/:id', (req, res) => {
    knex('evaluations').insert({ 
        restaurant_id: req.params.id,
        user_id: 1,
        price: req.body.price,
        cozy: req.body.cozy,
        luxury: req.body.luxury,
        modern: req.body.modern,
        taste: req.body.taste,
        loud: req.body.loud,
        services: req.body.services,
        recurrence: req.body.recurrence
    }).then( () => {
        const eval_temp = {};
        const knexWhere = knex('evaluations').where({restaurant_id: req.params.id})
        const total_count_recur = 0;
        const countTrue = 0; 
        knexWhere.first().count('recurrence').then( data => {
            total_count_recur = data.count;
        })
        knexWhere.where({recurrence: true}).first().count('recurrence').then( data => {
            countTrue = data.count;
        })
        knex('restaurants').where({id: req.params.id}).first().update({
            price: knexWhere.first(knex.raw('ROUND(AVG(price), 2)')).price,
            cozy: knexWhere.first(knex.raw('ROUND(AVG(cozy), 2)')).cozy,
            luxury: knexWhere.first(knex.raw('ROUND(AVG(luxury), 2')).luxury,
            modern: knexWhere.first(knex.raw('ROUND(AVG(modern), 2')).modern,
            taste: knexWhere.first(knex.raw('ROUND(AVG(taste), 2')).taste,
            loud: knexWhere.first(knex.raw('ROUND(AVG(loud), 2')).loud,
            services: knexWhere.first(knex.raw('ROUND(AVG(loud), 2')).services,
            recurrence: countTrue/total_count_recur * 100
        })
    }).then( () => {
        
        res.sendStatus(201);
    })
})

app.post('/sign-up', [ 
        check('email').isEmail(),
        check('password').isLength({ min: 5 }),
        body('email').custom( value => {
            return knex('users').select().where({ email: value })
                .then( ([user]) => {
                    if (user) return Promise.reject('E-mail already in use');
                })
        })
    ], (req, res) => {
        const errors = validationResult(req);
        
        if( !errors.isEmpty() ){
            errors.array().forEach( error => console.log(error.msg) ) 
            return res.status(422).json({ errors: errors.array() });
        }else{
            store.createUser({
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'email': req.body.email,
                'password': req.body.password,
                'address': req.body.address
            }).then( () => {
                console.log(`user created: 
                ${req.body.first_name} ${req.body.last_name}, 
                email: ${req.body.email} 
                password: ${req.body.password} 
                address: ${req.body.address}`)
            res.sendStatus(200);
            })
        }
})

app.post('/sign-in', (req, res) => {
        store.authenticate_user({
        'email': req.body.email,
        'password': req.body.password
        }).then( ({ success }) => {
            if(success) {
                console.log(`${req.body.email} has signed in`);
                res.sendStatus(200);
            }else {
                console.log(`authentication denied`);
                res.sendStatus(401);
            }
    })
})

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
