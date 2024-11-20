export interface Profile {
  id: number,
  username: string,
  description: string,
  avatarUrl: string | null,
  subscriptionAmount: number,
  firstName: string,
  LastName: string,
  isActive: boolean,
  stack: string[],
  city: string,
}
