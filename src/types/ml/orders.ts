import * as z from 'zod'

export const SortSchema = z.object({
  id: z.string(),
  name: z.string(),
})
export type Sort = z.infer<typeof SortSchema>

export const PagingSchema = z.object({
  total: z.number(),
  offset: z.number(),
  limit: z.number(),
})
export type Paging = z.infer<typeof PagingSchema>

export const BuyerSchema = z.object({
  id: z.number(),
  nickname: z.string(),
})
export type Buyer = z.infer<typeof BuyerSchema>

export const ContextSchema = z.object({
  application: z.null(),
  product_id: z.null(),
  channel: z.string(),
  site: z.string(),
  flows: z.array(z.any()),
})
export type Context = z.infer<typeof ContextSchema>

export const CouponSchema = z.object({
  amount: z.number(),
  id: z.null(),
})
export type Coupon = z.infer<typeof CouponSchema>

export const FeedbackSchema = z.object({
  buyer: z.null(),
  seller: z.null(),
})
export type Feedback = z.infer<typeof FeedbackSchema>

export const VariationAttributeSchema = z.object({
  name: z.string(),
  id: z.union([z.null(), z.string()]),
  value_id: z.union([z.null(), z.string()]),
  value_name: z.string(),
})
export type VariationAttribute = z.infer<typeof VariationAttributeSchema>

export const RequestedQuantitySchema = z.object({
  measure: z.string(),
  value: z.number(),
})
export type RequestedQuantity = z.infer<typeof RequestedQuantitySchema>

export const StockSchema = z.object({
  node_id: z.string(),
  store_id: z.null(),
})
export type Stock = z.infer<typeof StockSchema>

export const OrderRequestSchema = z.object({
  change: z.null(),
  return: z.null(),
})
export type OrderRequest = z.infer<typeof OrderRequestSchema>

export const AtmTransferReferenceSchema = z.object({
  transaction_id: z.null(),
  company_id: z.null(),
})
export type AtmTransferReference = z.infer<typeof AtmTransferReferenceSchema>

export const ShippingSchema = z.object({
  id: z.number(),
})
export type Shipping = z.infer<typeof ShippingSchema>

export const TaxesSchema = z.object({
  amount: z.null(),
  currency_id: z.null(),
  id: z.null(),
})
export type Taxes = z.infer<typeof TaxesSchema>

export const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category_id: z.string(),
  variation_id: z.number(),
  seller_custom_field: z.null(),
  global_price: z.null(),
  net_weight: z.null(),
  variation_attributes: z.array(VariationAttributeSchema),
  warranty: z.string(),
  condition: z.string(),
  seller_sku: z.string(),
})
export type Item = z.infer<typeof ItemSchema>

export const PaymentSchema = z.object({
  reason: z.string(),
  status_code: z.null(),
  total_paid_amount: z.number(),
  operation_type: z.string(),
  transaction_amount: z.number(),
  transaction_amount_refunded: z.number(),
  date_approved: z.coerce.date(),
  collector: ShippingSchema,
  coupon_id: z.null(),
  installments: z.number(),
  authorization_code: z.union([z.null(), z.string()]),
  taxes_amount: z.number(),
  id: z.number(),
  date_last_modified: z.coerce.date(),
  coupon_amount: z.number(),
  available_actions: z.array(z.string()),
  shipping_cost: z.number(),
  installment_amount: z.union([z.number(), z.null()]),
  date_created: z.coerce.date(),
  activation_uri: z.null(),
  overpaid_amount: z.number(),
  card_id: z.union([z.number(), z.null()]),
  status_detail: z.string(),
  issuer_id: z.string(),
  payment_method_id: z.string(),
  payment_type: z.string(),
  deferred_period: z.null(),
  atm_transfer_reference: AtmTransferReferenceSchema,
  site_id: z.string(),
  payer_id: z.number(),
  order_id: z.number(),
  currency_id: z.string(),
  status: z.string(),
  transaction_order_id: z.null(),
})
export type Payment = z.infer<typeof PaymentSchema>

export const OrderItemSchema = z.object({
  item: ItemSchema,
  quantity: z.number(),
  unit_price: z.number(),
  full_unit_price: z.number(),
  currency_id: z.string(),
  manufacturing_days: z.null(),
  picked_quantity: z.null(),
  requested_quantity: RequestedQuantitySchema,
  sale_fee: z.number(),
  listing_type_id: z.string(),
  base_exchange_rate: z.null(),
  base_currency_id: z.null(),
  bundle: z.null(),
  element_id: z.number(),
  stock: StockSchema.optional(),
})
export type OrderItem = z.infer<typeof OrderItemSchema>

export const ResultSchema = z.object({
  payments: z.array(PaymentSchema),
  fulfilled: z.null(),
  taxes: TaxesSchema,
  order_request: OrderRequestSchema,
  expiration_date: z.coerce.date(),
  feedback: FeedbackSchema,
  shipping: ShippingSchema,
  date_closed: z.coerce.date(),
  id: z.number(),
  manufacturing_ending_date: z.null(),
  order_items: z.array(OrderItemSchema),
  date_last_updated: z.coerce.date(),
  last_updated: z.coerce.date(),
  comment: z.null(),
  pack_id: z.union([z.number(), z.null()]),
  coupon: CouponSchema,
  shipping_cost: z.null(),
  date_created: z.coerce.date(),
  pickup_id: z.null(),
  status_detail: z.null(),
  tags: z.array(z.string()),
  buyer: BuyerSchema,
  seller: BuyerSchema,
  total_amount: z.number(),
  paid_amount: z.number(),
  currency_id: z.string(),
  status: z.string(),
  context: ContextSchema,
})
export type Result = z.infer<typeof ResultSchema>

export type MLGetOrdersResults = Result[]

export const MlGetOrdersResponseSchema = z.object({
  query: z.string(),
  results: z.array(ResultSchema),
  sort: SortSchema,
  available_sorts: z.array(SortSchema),
  filters: z.array(z.any()),
  paging: PagingSchema,
  display: z.string(),
})
export type MlGetOrdersResponse = z.infer<typeof MlGetOrdersResponseSchema>
