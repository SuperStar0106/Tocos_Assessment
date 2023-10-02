export interface IUser {
  id: string,
  balance: number,
}

export interface ITransaction {
  senderId: string,
  receiverId: string,
  amount: number,
}