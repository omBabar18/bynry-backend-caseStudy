
1.Company
-------
id (ObjectId, PK)
name (string)
email (string, unique)
created_at (timestamp)

2.User
----
id (ObjectId, PK)
company_id (FK → Company.id)
name (string)
email (string, unique)
role (enum: admin, manager, viewer)
created_at (timestamp)


3.Warehouse
---------
id (ObjectId, PK)
company_id (FK → Company.id)
name (string)
location (string)
created_at (timestamp)

4.Product
-------
id (ObjectId, PK)
company_id (FK → Company.id)
name (string)
sku (string, unique)
price (decimal)
description (string, optional)
unit_of_measure (string)
status (enum: active, inactive)
created_at (timestamp)


5.Inventory
---------
id (ObjectId, PK)
product_id (FK → Product.id)
warehouse_id (FK → Warehouse.id)
quantity (number)
min_stock_threshold (number)
updated_at (timestamp)

Unique Constraint:
(product_id, warehouse_id)


6.InventoryLog
------------
id (ObjectId, PK)
product_id (FK → Product.id)
warehouse_id (FK → Warehouse.id)
change_type (enum: IN, OUT, ADJUSTMENT)
quantity_changed (number)
reference (string)
created_at (timestamp)


7.Supplier
--------
id (ObjectId, PK)
company_id (FK → Company.id)
name (string)
contact_email (string)
contact_phone (string)
created_at (timestamp)


8.ProductSupplier
---------------
id (ObjectId, PK)
product_id (FK → Product.id)
supplier_id (FK → Supplier.id)

9.Bundle
------
id (ObjectId, PK)
company_id (FK → Company.id)
name (string)
sku (string, unique)
price (decimal)
created_at (timestamp)

10.BundleItems
-----------
id (ObjectId, PK)
bundle_id (FK → Bundle.id)
product_id (FK → Product.id)
quantity (number)



