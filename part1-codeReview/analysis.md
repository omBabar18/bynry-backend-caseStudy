# part 1:Code Review and Debugging.

## Issues Identified

1.No error handling.(try-catch missing)
 -Code will break the normal flow.

2.SKU uniqueness is not enforced. 

3.No Database transaction.

4.No input validations.
 -SKU format is not validated (should be alphanumeric).
 -Price is not validated to be a positive decimal value.
  
5.No check for existing product.(issue of redundancy)
 
6.The code assumes a product belongs to only one warehouse, but products can exist in multiple warehouses.

7.No database transaction is used.

8.Incomplete data model for product and inventory entities

9.No authentication / authorization
  -Any anonymous user can create and update data.


## Impact in production

- Application crashes due to unhandled exceptions.
- Duplicate SKUs can break ordering, reporting, and supplier workflows.
- Partial database writes can result in inconsistent records.
- Invalid data may lead to financial miscalculations.
- Multi-warehouse inventory tracking becomes unreliable.
- Unauthorized users can manipulate critical inventory data.


