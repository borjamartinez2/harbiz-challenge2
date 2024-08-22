import { Mongo } from 'meteor/mongo'
import { Player } from '../types'

export const Players = new Mongo.Collection<Player>('players')
