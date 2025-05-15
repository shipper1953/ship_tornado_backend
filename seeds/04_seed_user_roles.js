exports.seed = async function (knex) {
  console.log("🌱 Seeding user_roles...");

  const [user] = await knex("users").where({ email: "admin@example.com" });
  const [role] = await knex("roles").where({ name: "Super Admin" });

  if (!user || !role) {
    throw new Error("Missing user or role for user_roles seeding.");
  }

  await knex("user_roles").insert({
    user_id: user.id,
    role_id: role.id,
  });

  console.log("✅ user_roles seeded successfully.");
};
