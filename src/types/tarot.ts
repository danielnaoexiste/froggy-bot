export interface ITarotCard {
  name: string
  name_short: string
  value: string
  value_int: number
  suit: string
  type: string
  meaning_up: string
  meaning_rev: string
  desc: string
}

export interface ITarotCards {
  nhits: number
  cards: ITarotCard[]
}
