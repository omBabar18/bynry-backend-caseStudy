# Design Decisions & Justifications

## Separation of Product and Inventory
Products are independent of inventory to support multi-warehouse stock tracking.

## Composite Inventory Constraint
A unique constraint on (product_id, warehouse_id) prevents duplicate inventory rows.

## Inventory Logs
InventoryLog enables auditing, traceability, and historical analysis.

## Company-Based Scoping
company_id is included to ensure tenant isolation and scalable queries.
