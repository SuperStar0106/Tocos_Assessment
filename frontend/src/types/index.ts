export interface IUser {
  id: string,
  balance: number,
}

export interface ITransaction {
  id: string,
  senderId: string,
  receiverId: string,
  amount: number,
}