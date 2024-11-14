const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact)
  if (result.acknowledged) {
    res.status(201).json(
      {
        id: result.insertedId
      }
    )
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact')
  }
}

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id)
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const result = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact)
  if (result.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact')
  }
}

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id)
  const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId })
  if (result.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact')
  }
}

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
