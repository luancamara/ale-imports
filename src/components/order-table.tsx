import { getOrders } from "@/actions/orders"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export async function OrderTable() {
  const orders = await getOrders()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Item Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{formatDate(order.date_created.toLocaleString())}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.buyer.nickname}</TableCell>
              <TableCell>{formatCurrency(order.total_amount, order.currency_id)}</TableCell>
              <TableCell className="capitalize">{order.payments[0]?.payment_type.replace("_", " ")}</TableCell>
              <TableCell>
                {order.order_items.map((item) => (
                  <>
                    <div className="max-w-xs truncate" title={order.order_items[0]?.item.title}>
                      {item.item.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} x {formatCurrency(item.unit_price ?? 0, order.currency_id)}
                    </div>
                  </>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
