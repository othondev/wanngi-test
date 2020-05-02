const express = require('express');
const router = express.Router();
const Task = require('../database/schemas/TaskSchema')
const Tag = require('../database/schemas/TagSchema')
const auth = require('../middleware/authorization')

router.get('/', auth, async (req, res, next) => {
  const {userId} = req
  const tasks = await Task.find({userId}).populate('tags')
  res.json(tasks)
});

router.get('/tags', auth ,async (req, res, next) => {
  const {userId} = req
  const tags = await Tag.find({userId})
    .sort({ date: -1 })
  res.json(tags)
});

router.post('/tags', auth, async (req, res, next) => {
  const {userId} = req
  const tag = req.body
  tag.userId = userId
  const tagCreate = await Tag.create(tag)
  res.status(201).json(tagCreate)
});

router.post('/', auth, async (req, res, next) => {
  const {userId} = req
  const task = req.body
  task.userId = userId
  await Task.create(task)
  res.status(201).json(task)
});

router.put('/', auth, async (req, res, next) => {
  const {id,status} = req.body
  const newTask = await Task.findOneAndUpdate({id},{status}, {new: true})
  res.status(204).json(newTask)
});

router.delete('/', auth, async (req, res, next) => {
  const {id} = req.body
  const newTask = await Task.deleteOne({id})
  res.status(204).send()
});

module.exports = router;
