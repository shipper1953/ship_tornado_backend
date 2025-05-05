const db = require("../../db");
const EasyPost = require("@easypost/api");
const api = new EasyPost(process.env.EASYPOST_API_KEY);

exports.createShipmentForOrder = async (req, res) => {
  const { id: order_id } = req.params;
  const { from_address, to_address, parcel } = req.body;

  try {
    // Create shipment with EasyPost
    const shipment = await api.Shipment.create({
      to_address,
      from_address,
      parcel,
    });

    const selectedRate = shipment.rates[0]; // Optional: implement SmartRate logic later

    // Save to local DB
    const [savedShipment] = await db("shipments")
      .insert({
        order_id,
        carrier: selectedRate.carrier,
        service: selectedRate.service,
        rate_id: selectedRate.id,
        tracking_number: shipment.tracking_code,
        label_url: shipment.postage_label?.label_url,
        eta: shipment.est_delivery_date,
        status: shipment.status,
      })
      .returning("*");

    res.status(201).json(savedShipment);
  } catch (err) {
    console.error("🚨 Shipment creation failed:", err);
    res.status(500).json({ error: "Failed to create shipment" });
  }
};
