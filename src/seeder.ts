import { db } from "./models"
import { adminSchema } from "./models/shemas/adminSchema"
import admin from "./data/admins"

const importData = async () => {
  try {
    // const product: typeof productsTable.$inferInsert = {
    //   name: "John Doe",
    //   price: 100,
    //   description: "This is a description",
    //   image: "https://example.com/image.jpg",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),

    // }
    await db
      .insert(adminSchema)
      .values(admin.map((item) => ({ ...item })))
      .execute()
    // await db.insert(productsTable).values(items.map(item=>({...item}))).execute()

    console.log("Data imported successfully")
  } catch (error) {
    console.log(`${(error as Error).message}`)
  }
  process.exit()
}

const destroyData = async () => {
  try {
    await db.delete(adminSchema).execute()
    console.log("Items Deleted!")
  } catch (error) {
    console.log(`${(error as Error).message}`)
  }
  process.exit()
}

if (process.argv[2] === "--destroyData") {
  destroyData()
} else if (process.argv[2] === "--importData") {
  importData()
}
