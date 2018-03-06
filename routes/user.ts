/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();
import { UserStore } from '../src/db';
import * as Promise from 'bluebird';
import * as util from 'util';
import { User } from '../src/user';
const storeUser = new UserStore();

router.post('/create', (req: express.Request, res: express.Response) => {
    const user = new User(req.body);
    return storeUser.createUser(user)
        .then(result => res.status(200).send({ message: result }))
        .catch(err => res.status(409).send({ error: err }));
});

router.get('/:username', (req: express.Request, res: express.Response) => {
    const user = req.params['username'];
    const apiKey = req.query['apiKey'];
    return storeUser.validateApiKey(apiKey)
        .then(() => storeUser.getUserByName(user))
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send({ error: err }));
});

router.get('/', (req: express.Request, res: express.Response) => {
    const apiKey = req.query['apiKey'];
    return storeUser.validateApiKey(apiKey)
        .then(() => storeUser.getAllUsers())
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send({ error: err }));
});

router.delete('/:username', (req: express.Request, res: express.Response) => {
    const user = req.params['username'];
    const apiKey = req.query['apiKey'];
    return storeUser.validateApiKey(apiKey)
        .then(() => storeUser.deleteUser(user))
        .then(result => res.status(200).send({ message: result }))
        .catch(err => res.status(400).send({ error: err }));
});

export default router;