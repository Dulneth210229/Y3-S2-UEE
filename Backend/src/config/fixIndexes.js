// import mongoose from "mongoose";

// export async function dropLegacyIndexes() {
//   const col = mongoose.connection.collection("users");
//   const indexes = await col.indexes();

//   // check if "username_1" exists
//   if (indexes.some((idx) => idx.name === "username_1")) {
//     console.log("⚠️ Found legacy index 'username_1', dropping it...");
//     await col.dropIndex("username_1");
//     console.log("✅ Dropped 'username_1' index.");
//   }
// }
