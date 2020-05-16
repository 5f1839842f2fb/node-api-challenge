const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel')

const validateProjectId = (req, res, next) => {
  db.get(req.params.id)
  .then(response => {
    if (response !== null) {
      next()
    } else {
      console.log('invalid user requested')
      res.status(400).json({ message: "invalid project id" })
    }
    
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

const validateNewProject = (req, res, next) => {
  if (!("name" in req.body) || !("description" in req.body)) {
    res.status(400).json({ message: "missing required field(s)"})
  } else {
    next()
  }
}

router.use('/:id', validateProjectId)
router.post('/', validateNewProject)
router.put('/:id', validateNewProject)

router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

router.get('/:id/actions', (req, res) => {
  db.getProjectActions(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

router.post('/', (req, res) => {
  db.insert(req.body)
  .then(response => {
    res.status(201).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
});

module.exports = router