const { request, response } = require('express');
const Event = require('../models/EventModel');

const getEvents = async (req = request, res = response) => {
  const events = await Event.find();
  return res.status(200).json({
    ok: true,
    msg: 'Get events',
    events,
  });
};

const createEvent = async (req = request, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.id;
    await event.save();
    return res.status(201).json({ ok: true, event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk with the admin',
    });
  }
};

const updateEvent = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'Update event',
  });
};

const deleteEvent = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'Delete event',
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
