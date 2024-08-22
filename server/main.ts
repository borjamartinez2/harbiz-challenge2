import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { PLAYER_TYPE } from '../imports/types'
import { Players } from '../imports/api/playersApi'

Meteor.startup(function () {
  function generateRandomName() {
    const firstNames = ['Ada', 'Grace', 'Marie', 'Carl', 'Nikola', 'Claude']
    const lastNames = ['Lovelace', 'Hopper', 'Curie', 'Gauss', 'Tesla', 'Shannon']

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return `${firstName} ${lastName}`
  }

  Players.find()
    .countAsync()
    .then((count) => {
      if (count === 0) {
        Object.values(PLAYER_TYPE).forEach((value) => {
          for (let i = 0; i < 6; i++) {
            Players.insertAsync({
              name: generateRandomName(),
              score: Math.floor(Random.fraction() * 10) * 5,
              playerType: value,
            })
          }
        })
      }
    })
})
