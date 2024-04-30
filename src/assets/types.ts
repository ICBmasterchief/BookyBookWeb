interface Book {
  id: number
  title: string
  author: string
  genre: string
  year: number
  copies: number
  score: number
}

interface Borrowing {
  id: number
  borrowingDate: Date
  dateToReturn: Date
  returnedDate?: Date
  returned: boolean
  penaltyFee: number
  userId: number
  bookId: number
}

interface User {
  id: number
  name: string
  email: string
  password: string
  registrationDate: Date
  penaltyFee: number
  role: string
}
