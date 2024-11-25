import { getOrders } from "@/actions/orders"
import { EnhancedOrderTable } from "@/components/enhanced-order-table"

export default async function OrderTable() {
  const orders = await getOrders()

  return <EnhancedOrderTable orders={orders} />
}
