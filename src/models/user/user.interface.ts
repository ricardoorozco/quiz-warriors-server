// interface for user create
export interface IUserCreate {
  username: string
  transaction: string
  ip: string
  level: number
  experience: number
  coins: number
  gems: number
  registeredIn?: string
  updatedIn?: string
}