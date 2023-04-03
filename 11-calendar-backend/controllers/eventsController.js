const { request, response } = require('express');
const Event = require('../models/EventModel');

const getEvents = async (req = request, res = response) => {
  const events = await Event.find().populate('user', ['name']);

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

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const authUserId = req.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `Event not found by id: ${eventId}`,
      });
    }

    if (event.user.toString() !== authUserId) {
      return res.status(403).json({
        ok: false,
        msg: "Your user doesn't have permissions to edit this event",
      });
    }

    const updatingData = { ...req.body, user: authUserId };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatingData, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'Update event',
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Talk with the admin',
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const authUserId = req.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `Event not found by id: ${eventId}`,
      });
    }

    if (event.user.toString() !== authUserId) {
      return res.status(403).json({
        ok: false,
        msg: "Your user doesn't have permissions to edit this event",
      });
    }

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      ok: true,
      msg: 'The event has been deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Talk to the admin',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
