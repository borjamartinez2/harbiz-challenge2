import { Template } from 'meteor/templating'
import { PLAYER_TYPE } from '../../../../imports/types'
import { AppConstants } from '../../../../imports/constants'
import { playerStore } from '../../../store/playerStore'

function getPointsByPlayerType(playerType: PLAYER_TYPE) {
  if (playerType === PLAYER_TYPE.ATHLETE) return 5
  else if (playerType === PLAYER_TYPE.SCIENTIST) return 10
  else return 15
}

Template.selectedPlayerInfo.helpers({
  selectedName: function () {
    const player = playerStore.getSelectedPlayer()
    return `${player.name} (${player.playerType})`
  },
  pointsToAdd: function () {
    const player = playerStore.getSelectedPlayer()
    return getPointsByPlayerType(player.playerType)
  },
})

Template.selectedPlayerInfo.events({
  'click .inc': function () {
    const selectedPlayer = playerStore.getSelectedPlayer()
    const pointsToIncrement = getPointsByPlayerType(selectedPlayer.playerType)

    Meteor.call(
      AppConstants.Players.Methods.UPDATE_PLAYER_SCORE,
      selectedPlayer._id,
      pointsToIncrement
    )
  },
})
