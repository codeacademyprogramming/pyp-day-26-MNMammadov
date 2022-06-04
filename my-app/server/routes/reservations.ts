const router = require('express').Router();
let Reservation = require('../models/index');

router.route('/:id').get((req: Request, res: Response) => {
    Reservation.find({ roomid: Number(req.params.id) })
        .then(reservs => res.json(reservs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req: Request, res: Response) => {
    Reservation.find()
        .then(reservs => res.json(reservs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/add').post((req: Request, res: Response) => {
    const id = req.body.id;
    const username = req.body.username;
    const from = Date.parse(req.body.from);
    const to = Date.parse(req.body.to);
    const note = req.body.note;
    const roomid = Number(req.params.id);
    const newReserv = new Reservation({
        id,
        username,
        from,
        to,
        note,
        roomid
    });

    newReserv.save()
        .then(() => res.json('Reservation added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;