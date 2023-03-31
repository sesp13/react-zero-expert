const { Router } = require('express');
const { check } = require('express-validator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/validateJwt');

/* BASE PATH /api/events */
const router = Router();

// Global middlewares, this is applied to all the requests below
router.use([validateJWT]);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'The title is required').notEmpty(),
    check('start', 'the start date is required').custom(isDate),
    check('end', 'the end date is required').custom(isDate),
    fieldValidator,
  ],
  createEvent
);

router.put('/:id', updateEvent);

router.put('/:id', deleteEvent);

module.exports = router;
