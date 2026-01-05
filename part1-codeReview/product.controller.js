// Controller to add a new product with inventory initialization.

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

const createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Authentication check
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, sku, price, warehouseId, initialQuantity } = req.body;

    // 2. Input validation
    if (!name || !sku || !price || !warehouseId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!/^[a-zA-Z0-9-_]{6,}$/.test(sku)) {
      return res.status(400).json({
        message:
          "SKU must be at least 6 characters and contain only alphanumeric characters, hyphens, or underscores",
      });
    }

    if (price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than zero" });
    }

    // 3. Enforce SKU uniqueness
    const existingSku = await Product.findOne({ sku }).session(session);
    if (existingSku) {
      return res.status(409).json({ message: "SKU already exists" });
    }

    // 4. Create product
    const product = await Product.create(
      [
        {
          name,
          sku,
          price,
          companyId: req.user.companyId,
          createdBy: req.user.id,
        },
      ],
      { session }
    );

    // 5. Create inventory for warehouse
    await Inventory.create(
      [
        {
          productId: product[0]._id,
          warehouseId,
          quantity: initialQuantity || 0,
        },
      ],
      { session }
    );

    // 6. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Product created successfully",
      productId: product[0]._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

module.exports = { createProduct };
