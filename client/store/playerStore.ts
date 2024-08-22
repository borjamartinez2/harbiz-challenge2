import { ReactiveVar } from 'meteor/reactive-var'
import { Player } from '../../imports/types'

class PlayerStore {
  private selectedPlayer: ReactiveVar<Player | null>

  constructor() {
    this.selectedPlayer = new ReactiveVar<Player | null>(null)
  }

  setSelectedPlayer(player: Player) {
    this.selectedPlayer.set(player)
  }

  getSelectedPlayer(): Player {
    const player = this.selectedPlayer.get()
    if (!player) {
      throw new Meteor.Error(
        'selectedPlayer-not-found',
        'No player is selected'
      )
    }
    return player
  }
}

export const playerStore = new PlayerStore()
