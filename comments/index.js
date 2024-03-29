const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    try {
        const commentId = randomBytes(4).toString('hex');
        const { content } = req.body;

        const comments = commentsByPostId[req.params.id] || [];

        comments.push({ id: commentId, content, status: 'pending' });
        commentsByPostId[req.params.id] = comments;


        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: 'pending',
            }
        })

        res.status(201).json(comments);
    } catch (error) {
        console.log('Error in comments index post method');
        res.send(commentsByPostId);
    }
});


app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(type)
    try {

        if (type === 'CommentModerated') {
            const { postId, id, content, status } = data;

            const comments = commentsByPostId[postId];

            const comment = comments.find(comment => comment.id === id);

            comment.status = status;

            await axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentUpdated',
                data: {
                    id,
                    content,
                    postId,
                    status
                }
            })
        }

        res.send({});
    } catch (error) {
        console.log('Error in comments');
        res.send({});
    }
})


app.listen(4001, () => {
    console.log('Listening on 4001');
});