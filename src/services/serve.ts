import { AdminServices } from "./admin"
import { ChurchMemberServices } from "./church_member"
import { UserService } from "./user"

export interface IServices {
  userAdmin: AdminServices
  user: UserService
  churchMember: ChurchMemberServices
}

export const startServices = async () => {
  try {
    const userAdmin = new AdminServices()
    const churchMember = new ChurchMemberServices()
    const user = new UserService()
    return { userAdmin, churchMember, user }
  } catch (error) {
    throw error
  }
}
