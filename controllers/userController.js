import express from "express"
import User from "../models/user.js"

// Registration route
export const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: 'Registration Successful' })

  } catch (err) {
    console.log(err)
    
    return res.status(422).json(err)
  }
}

// Login route
export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin) return res.status(401).json({ message: 'Unauthorised'})
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}