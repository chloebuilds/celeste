import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js' 



// this function is actually going to be middleware
// because it's middleware (defined in our router methods)
export const secureRoute = async (req, res, next) => {
  try {
    // req.headers contains all headers present on the request
    // we're specifically looking for the authorisation header, which contains our bearer token
    // the below checks if this exists, if it doesn't, we throw a Missing header error
    console.log('headers ->', req.headers)
    if (!req.headers.authorization) throw new Error('Missing header')
    // if we get tot his point the authorisation header is present - so we can remove the 'Bearer ' from the header
    // We'll then be anle to pass in into jwt.verify
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('token', token)
    // We are going to verify the token with the secret by using jwt.verify
    // first argument is the token, second is the secret
    // If verified, it returns the payload - we can then use this payload to query to the User collection to see if that user exists
    // throws an error is verification fails
    const payload = jwt.verify(token, secret)
    console.log('payload', payload)

    // Next step is verifying that the user id on the sub on the payload matches a user ins the Users collection
    // So we will query the User model, passing in payload.sub
    const userToVerify = await User.findById(payload.sub)
    // if no user is found with the id on the payload.sub, we will throw an error as it's no longer a valid token
    if (!userToVerify) throw new Error('User not found')
    // at this point we have verified the token, matched it against a user and are happy to pass along to the controller

    // req.currentUser doesn't currently exist, it's an undefined key
    // whenever we use middleware
    req.currentUser = userToVerify

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}