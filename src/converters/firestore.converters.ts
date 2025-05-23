import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore'
import Category from '../types/category.types'
import User from '../types/user.types'

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return { ...category }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category {
    const data = snapshot.data(options)

    return {
      id: data.id,
      name: data.name,
      displayName: data.displayName,
      imageUrl: data.imageUrl,
      products: data.products
    }
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      provider: data.provider
    }
  }
}
