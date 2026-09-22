export type PartnerCategory
  = 'the_best_partner'
    | 'super_partner'
    | 'youtube_partner'
    | 'afterparty_partner'
    | 'skvely_partner'
    | 'prima_partner'
    | 'fan_partner'
    | 'institucionalni_partner'
    | 'pravni_poradentstvi'
    | 'medialni_partner'

export interface Partner {
  id: number
  sort: number | null
  name: string
  url: string
  logo: string
  category: string
}
