import { Players } from '../../../imports/api/playersApi'
import { check } from 'meteor/check'

Meteor.methods({
  'player.incrementScore': function (playerId: string, incrementValue: number) {
    check(playerId, String)
    check(incrementValue, Number)

    Players.updateAsync(playerId, { $inc: { score: incrementValue } })
  },
})
