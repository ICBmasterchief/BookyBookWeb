export interface Book {
  id: number
  title: string
  author: string
  genre: string | null
  year: number | null
  copies: number
  score: number
}

export interface BookPOST {
  title: string
  author: string
  genre: string | null
  year: number | null
  copies: number
  score: number
}

export interface Borrowing {
  id: number
  borrowingDate: Date
  dateToReturn: Date
  returnedDate?: Date
  returned: boolean
  penaltyFee: number
  userId: number
  bookId: number
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  registrationDate: Date
  penaltyFee: number
  role: string
}
