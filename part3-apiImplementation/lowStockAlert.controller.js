const getLowStockAlerts = async (req, res) => {
  try {
    const { companyId } = req.params;

    // 1. Authorization check
    if (req.user.companyId !== companyId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 2. Fetch products with recent sales (last 30 days)
    const recentSalesProducts = await Sales.distinct("productId", {
      companyId,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // 3. Fetch inventory for these products
    const inventories = await Inventory.find({
      productId: { $in: recentSalesProducts }
    }).populate("productId warehouseId");

    const alerts = [];

    for (const inv of inventories) {
      if (inv.quantity <= inv.productId.lowStockThreshold) {
        const supplier = await ProductSupplier.findOne({
          productId: inv.productId._id
        }).populate("supplierId");

        alerts.push({
          product_id: inv.productId._id,
          product_name: inv.productId.name,
          sku: inv.productId.sku,
          warehouse_id: inv.warehouseId._id,
          warehouse_name: inv.warehouseId.name,
          current_stock: inv.quantity,
          threshold: inv.productId.lowStockThreshold,
          days_until_stockout: Math.floor(
            inv.quantity / (inv.productId.avgDailySales || 1)
          ),
          supplier: {
            id: supplier.supplierId._id,
            name: supplier.supplierId.name,
            contact_email: supplier.supplierId.contact_email
          }
        });
      }
    }

    return res.status(200).json({
      alerts,
      total_alerts: alerts.length
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch low stock alerts",
      error: error.message
    });
  }
};

module.exports = { getLowStockAlerts };
