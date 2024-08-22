import { Template } from 'meteor/templating'
import { Player, PLAYER_TYPE } from '../../../../imports/types'
import { playerStore } from '../../../store/playerStore'

interface PlayerListTemplateData {
  playersType: PLAYER_TYPE
  players: Player[]
}
Template.playerList.helpers({
  listDescription() {
    const instance = Template.currentData() as PlayerListTemplateData
    const article = instance.playersType === PLAYER_TYPE.SCIENTIST ? 'an' : 'a'

    return `Select ${article} ${instance.playersType} to give them points`
  },
  selected() {
    const selectedPlayer = playerStore.getSelectedPlayer()

    return selectedPlayer?._id === this._id ? 'selected' : ''
  },
})

Template.player.helpers({
  selected() {
    const selectedPlayer = playerStore.getSelectedPlayer()

    return selectedPlayer?._id === this._id ? 'selected' : ''
  },
})

Template.player.events({
  click: function () {
    playerStore.setSelectedPlayer(this)
  },
})
