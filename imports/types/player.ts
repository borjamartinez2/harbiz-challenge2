export type Player = {
  _id: string
  name: string
  score: number
  playerType: PLAYER_TYPE
}

export enum PLAYER_TYPE {
  ATHLETE = 'athlete',
  SCIENTIST = 'scientist',
  ACTOR = 'actor',
}
