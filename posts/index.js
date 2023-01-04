const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());


const posts = {};

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const { title } = req.body;

        posts[id] = {
            id, title
        };

        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id, title
            }
        })

        res.status(201).json(posts[id]);
    } catch (error) {
        console.log('Error in posts index post method');
        res.send({});
    }
});



app.post('/events', (req, res) => {
    try {
        console.log('Received Event', req.body.type);

        res.send({});
    } catch (error) {
        console.log('error in posts post events');
        res.send({});
    }
})

app.listen(4000, () => {
    console.log('Listening on 4000');
});