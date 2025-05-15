const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.seed = async function (knex) {
  console.log("🌱 Seeding users...");

  await knex("users").del();

  const hashedPassword = await bcrypt.hash("yourPasswordHere", 10);

  await knex("users").insert([
    {
      id: "11111111-1111-1111-1111-111111111111",
      company_id: "11111111-1111-1111-1111-111111111111",
      email: "admin@example.com",
      password_hash: hashedPassword,
      role_id: "11111111-1111-1111-1111-111111111111", // Super Admin
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  console.log("✅ User seeded successfully.");
};
