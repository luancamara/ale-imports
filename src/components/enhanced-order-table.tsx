'use client'

import type { MLGetOrderResponse, MlGetOrdersResponse, MLGetOrdersResults } from '@/types/ml/orders'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import dayjs from 'dayjs'
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

interface Order {
  id: number,
  date_created: string,
  status: string,
  buyer: {
    nickname: string
  },
  total_amount: number,
  currency_id: string,
  payments: Array<{
    payment_method_id: string,
    payment_type: string
  }>,
  order_items: Array<{
    item: {
      title: string
    },
    quantity: number,
    unit_price: number
  }>
}

interface SortConfig {
  key: keyof Order,
  direction: 'asc' | 'desc'
}

const ITEMS_PER_PAGE = 10

interface Props {
  orders: MlGetOrdersResponse
}

export function EnhancedOrderTable({ orders: { results: initialOrders, paging } }: Props) {
  const [orders, setOrders] = useState<MLGetOrdersResults>(initialOrders)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date_created', direction: 'desc' })
  const [selectedOrder, setSelectedOrder] = useState<MLGetOrderResponse | null>(null)

  const formatDate = (date: string | Date) => {
    return dayjs(date).format('DD [de] MMMM [de] YYYY [às] HH:mm')
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount)
  }

  const filteredOrders = orders.filter(
    order =>
      order.id.toString().includes(filter)
      || order.buyer.nickname.toLowerCase().includes(filter.toLowerCase())
      || order.status.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const paginatedOrders = sortedOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE)

  const handleSort = (key: keyof Order) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleRowClick = (order: MLGetOrderResponse) => {
    setSelectedOrder(order)
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-4'>
        <Input
          placeholder='Filter orders...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className='max-w-sm'
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]' onClick={() => handleSort('id')}>
              Order ID
              {' '}
              {sortConfig.key === 'id'
              && (sortConfig.direction === 'asc'
                ? (
                    <ChevronUp className='inline' />
                  )
                : (
                    <ChevronDown className='inline' />
                  ))}
            </TableHead>
            <TableHead onClick={() => handleSort('date_created')}>
              Date Created
              {' '}
              {sortConfig.key === 'date_created'
              && (sortConfig.direction === 'asc'
                ? (
                    <ChevronUp className='inline' />
                  )
                : (
                    <ChevronDown className='inline' />
                  ))}
            </TableHead>
            <TableHead onClick={() => handleSort('status')}>
              Status
              {' '}
              {sortConfig.key === 'status'
              && (sortConfig.direction === 'asc'
                ? (
                    <ChevronUp className='inline' />
                  )
                : (
                    <ChevronDown className='inline' />
                  ))}
            </TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead onClick={() => handleSort('total_amount')}>
              Total Amount
              {' '}
              {sortConfig.key === 'total_amount'
              && (sortConfig.direction === 'asc'
                ? (
                    <ChevronUp className='inline' />
                  )
                : (
                    <ChevronDown className='inline' />
                  ))}
            </TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Item Details</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map(order => (
            <TableRow key={order.id} onClick={() => handleRowClick(order)} className='cursor-pointer'>
              <TableCell className='font-medium'>{order.id}</TableCell>
              <TableCell>{formatDate(order.date_created)}</TableCell>
              <TableCell>
                <Badge variant='outline' className='capitalize'>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.buyer.nickname}</TableCell>
              <TableCell>{formatCurrency(order.total_amount, order.currency_id)}</TableCell>
              <TableCell className='capitalize'>{order.payments[0]?.payment_type.replace('_', ' ')}</TableCell>
              <TableCell>
                {order.order_items.map((item, index) => (
                  <div key={index} className='mb-2'>
                    <div className='max-w-xs truncate' title={item.item.title}>
                      {item.item.title}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      Quantity:
                      {' '}
                      {item.quantity}
                      {' '}
                      x
                      {' '}
                      {formatCurrency(item.unit_price, order.currency_id)}
                    </div>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='size-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='size-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DialogTrigger asChild>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                      <div className='grid gap-4 py-4'>
                        <div>
                          <h3 className='font-semibold'>
                            Order ID:
                            {selectedOrder.id}
                          </h3>
                          <p>
                            Date:
                            {formatDate(selectedOrder.date_created)}
                          </p>
                          <p>
                            Status:
                            {selectedOrder.status}
                          </p>
                          <p>
                            Buyer:
                            {selectedOrder.buyer.nickname}
                          </p>
                          <p>
                            Total:
                            {formatCurrency(selectedOrder.total_amount, selectedOrder.currency_id)}
                          </p>
                        </div>
                        <div>
                          <h4 className='font-semibold'>Items:</h4>
                          {selectedOrder.order_items.map((item, index) => (
                            <div key={index} className='mb-2'>
                              <p>{item.item.title}</p>
                              <p>
                                Quantity:
                                {item.quantity}
                              </p>
                              <p>
                                Price:
                                {formatCurrency(item.unit_price, selectedOrder.currency_id)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          Page
          {' '}
          {currentPage}
          {' '}
          of
          {' '}
          {totalPages}
        </div>
        <div>
          <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='ml-2'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
