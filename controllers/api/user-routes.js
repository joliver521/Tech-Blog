const router = require('express').Router();
const User = require('../models/User');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['id', 'title', 'post_text', 'created_at'],
                },
            },
        ],
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new user
router.post('/', (req, res) => {});

// login a user
router.post('/login', (req, res) => {});

// logout a user
router.post('/logout', (req, res) => {});

// update a user
router.put('/:id', (req, res) => {});

// delete a user
router.delete('/:id', (req, res) => {});

module.exports = router;
