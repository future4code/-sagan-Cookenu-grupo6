import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator, AuthenticationData } from "../services/Authenticator"

const authenticateUser = (req: Request): AuthenticationData => {
  const token = req.headers.authorization as string
  const authenticator = new Authenticator()
  const authenticationData = authenticator.verify(token)

  if (!authenticationData || !authenticationData.id) {
    throw new Error('Missing or invalid token')
  }
  return authenticationData
}

export const getUserByIDEndpoint = async (req: Request, res: Response) => {
  try {
    const authenticationData = authenticateUser(req)
    const id = req.params.id

    if (!id) {
      throw new Error('Missing or invalid id')
    }

    const cookenuUser = new UserDatabase()
    const user = cookenuUser.getUserByID(id)
    return res.status(200).send({ user })
  } catch (err) {
    return res.status(400).send({
      message: err.message
    })
  }
}

export const getUserByTokenEndpoint = async (req: Request, res: Response) => {
  try {
    const authenticationData = authenticateUser(req)
    const cookenuUser = new UserDatabase()
    const user = cookenuUser.getUserByID(authenticationData.id)

    return res.status(200).send({ user })
  } catch (err) {
    return res.status(400).send({
      message: err.message
    })
  }
}