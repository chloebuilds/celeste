import Zodiac from "../models/zodiac.js"


// CONTROLLERS
export const getAllZodiacs = async (_req, res) => {
  try {
    const zodiacs = await Zodiac.find()
    console.log(zodiacs)
    return res.status(200).json(zodiacs)
  } catch (error) {
    console.log(error)
  }
}

export const addZodiac = async (req, res) => {
  try {
    console.log('req.currentUser', req.currentUser)
    console.log('req.body', req.body)

    req.body.owner = req.currentUser._id

    const zodiacToAdd = await Zodiac.create({ ...req.body, owner: req.currentUser._id })
    return res.status(201).json(zodiacToAdd)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
    
  }
}

export const getSingleZodiac = async (req, res) => {
  try {
    const { id } = req.params
    const zodiac = await Zodiac.findById(id)
    console.log(zodiac)
    return res.status(200).json(zodiac)
  } catch (error) {
    console.log(error)
  }
}

export const updateZodiac = async (req, res) => {
  try {
    const zodiacToUpdate = await Zodiac.findById(id)
    Object.assign(zodiacToUpdate, req.body)
    await zodiacToUpdate.save()
    return res.status(202).json(zodiacToUpdate)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const deleteZodiac = async (req, res) => {
  try {
    const { id } = req.params
    await Zodiac.findByIdAndRemove(id)
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}