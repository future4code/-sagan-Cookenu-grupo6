import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { HashManager } from '../services/HashManager';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export const loginEndpoint = async (req: Request, res: Response) => {
  try {

    if (!req.body.email || !req.body.password) {
      throw new Error(" Invalid email or password")
    }

    const userData = {
      email: req.body.email,
      password: req.body.password
    }
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(userData.email)

    if (!user) {
      return res.status(400).send({
        message: 'User not found'
      })
    }

    const hashManager = new HashManager();
    const comparePassword = await hashManager.compare(userData.password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        message: 'Incorrect password'
      })
    }

    const authenticator = new Authenticator()
    const token = authenticator.generateToken({
      id: user.id
    })

    res.status(200).send({
      access_token: token
    })

  } catch (err) {
    res.status(400).send({
      message: err.message      
    })

  } finally {
    await BaseDatabase.destroyConnection();
  }
}