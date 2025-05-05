const db = require("../../db");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db("orders");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await db("orders").where({ id }).first();
    const shipments = await db("shipments").where({ order_id: id });
    res.json({ ...order, shipments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

exports.createOrder = async (req, res) => {
  const { order_number, customer_name, customer_email } = req.body;
  try {
    const [order] = await db("orders")
      .insert({ order_number, customer_name, customer_email })
      .returning("*");
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};
