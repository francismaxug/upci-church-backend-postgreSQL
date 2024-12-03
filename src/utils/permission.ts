type Permission = {
  AppAdmin: string[]
  User: string[]
  [key: string]: string[]
}

const Roles = Object.freeze({
  AppUser: "AppUser",
  AppAdmin: "AppAdmin",
  Admin: "Admin",
  AppSuperUser: "AppSuperUser"
})

const PERMISIONS: Permission = {
  AppAdmin: [],
  User: ["save:info"]
}

export const permit = (userType: string, permission: string) => {
  return PERMISIONS[userType].includes(permission)
}
