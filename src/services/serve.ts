import { AdminServices } from "./admin"
import { IAppContext } from "../types/app"

export interface IServices {
  userAdmin: AdminServices
}

export const startServices = async () => {
  try {
    const userAdmin = new AdminServices()
    return { userAdmin }
  } catch (error) {
    throw error
  }
}
