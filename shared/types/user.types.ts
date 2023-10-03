export interface IUser {
    _id: string
    email: string
    password: string
    isAdmin: boolean
    isMainAdmin?: boolean
    createdAt: string
}