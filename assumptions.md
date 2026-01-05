# Assumptions

1. Authentication is implemented using JWT and user details are available in   req.user.
2. MongoDB is configured as a replica set to support transactions.
3. SKU values are globally unique across the platform.
4. Products can exist in multiple warehouses with separate inventory records.
5. Only authorized users can create or update products and inventory.
