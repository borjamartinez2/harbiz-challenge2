import { Template } from 'meteor/templating'
import { Player } from '../../../imports/types'
import { AppConstants } from '../../../imports/constants'
import { Players } from '../../../imports/api/playersApi'
import { playerStore } from '../../store/playerStore'

Template.leaderboard.onCreated(function (this: Blaze.TemplateInstance) {
  this.subscribe(AppConstants.Players.Publications.PLAYERS_GET)
})

Template.leaderboard.helpers({
  groupedPlayers() {
    const players = Players.find({}, { sort: { score: -1, name: 1 } }).fetch()

    const grouped = players.reduce(
      (groups: { [playerType: string]: Player[] }, player) => {
        const type = player.playerType || 'Unknown'
        if (!groups[type]) {
          groups[type] = []
        }
        groups[type].push(player)
        return groups
      },
      {}
    )
    return Object.entries(grouped).map(([playerType, players]) => ({
      playerType,
      players,
    }))
  },
  selectedPlayer() {
    return playerStore.getSelectedPlayer()
  },
})
