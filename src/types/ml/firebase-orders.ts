import * as z from 'zod'

export const BuyerSchema = z.object({
  nickname: z.string().nullish(),
  id: z.number().nullish(),
  status: z.null().nullish(),
  internal_tags: z.array(z.any()).nullish(),
  tags: z.array(z.any()).nullish(),
  first_name: z.string().nullish(),
  user_type: z.null().nullish(),
  last_name: z.string().nullish(),
  buy_restrictions: z.array(z.any()).nullish(),
})
export type Buyer = z.infer<typeof BuyerSchema>

export const ContextSchema = z.object({
  application: z.null().nullish(),
  flows: z.array(z.string()).nullish(),
  site: z.string().nullish(),
  store_id: z.null().nullish(),
  channel: z.string().nullish(),
  product_id: z.null().nullish(),
})
export type Context = z.infer<typeof ContextSchema>

export const CouponSchema = z.object({
  amount: z.number().nullish(),
  id: z.null().nullish(),
})
export type Coupon = z.infer<typeof CouponSchema>

export const FeedbackSchema = z.object({
  buyer: z.null().nullish(),
  seller: z.null().nullish(),
})
export type Feedback = z.infer<typeof FeedbackSchema>

export const MediationSchema = z.object({
  id: z.number().nullish(),
})
export type Mediation = z.infer<typeof MediationSchema>

export const VariationAttributeSchema = z.object({
  value_id: z.string().nullish(),
  id: z.string().nullish(),
  name: z.string().nullish(),
  value_name: z.string().nullish(),
})
export type VariationAttribute = z.infer<typeof VariationAttributeSchema>

export const RequestedQuantitySchema = z.object({
  measure: z.string().nullish(),
  value: z.number().nullish(),
})
export type RequestedQuantity = z.infer<typeof RequestedQuantitySchema>

export const StockSchema = z.object({
  node_id: z.string().nullish(),
  store_id: z.null().nullish(),
})
export type Stock = z.infer<typeof StockSchema>

export const OrderRequestSchema = z.object({
  change: z.null().nullish(),
  return: z.null().nullish(),
})
export type OrderRequest = z.infer<typeof OrderRequestSchema>

export const AtmTransferReferenceSchema = z.object({
  transaction_id: z.string().nullish(),
  company_id: z.string().nullish(),
})
export type AtmTransferReference = z.infer<typeof AtmTransferReferenceSchema>

export const CostComponentsSchema = z.object({
  gap_discount: z.number().nullish(),
  loyal_discount: z.number().nullish(),
  ratio: z.number().nullish(),
  special_discount: z.number().nullish(),
  compensation: z.number().nullish(),
})
export type CostComponents = z.infer<typeof CostComponentsSchema>

export const PriorityClassSchema = z.object({
  id: z.string().nullish(),
})
export type PriorityClass = z.infer<typeof PriorityClassSchema>

export const CitySchema = z.object({
  name: z.string().nullish(),
  id: z.string().nullish(),
})
export type City = z.infer<typeof CitySchema>

export const NodeSchema = z.object({
  logistic_center_id: z.string().nullish(),
  node_id: z.string().nullish(),
})
export type Node = z.infer<typeof NodeSchema>

export const DimensionsSourceSchema = z.object({
  origin: z.string().nullish(),
  id: z.string().nullish(),
})
export type DimensionsSource = z.infer<typeof DimensionsSourceSchema>

export const BufferingSchema = z.object({
  date: z.coerce.date().nullish(),
})
export type Buffering = z.infer<typeof BufferingSchema>

export const EstimatedDeliverySchema = z.object({
  offset: z.number().nullish(),
  date: z.coerce.date().nullish(),
})
export type EstimatedDelivery = z.infer<typeof EstimatedDeliverySchema>

export const OffsetSchema = z.object({
  date: z.coerce.date().nullish(),
  shipping: z.number().nullish(),
})
export type Offset = z.infer<typeof OffsetSchema>

export const PickupPromiseSchema = z.object({
  from: z.null().nullish(),
  to: z.null().nullish(),
})
export type PickupPromise = z.infer<typeof PickupPromiseSchema>

export const SiblingSchema = z.object({
  sibling_id: z.number().nullish(),
  source: z.string().nullish(),
  description: z.string().nullish(),
  date_created: z.coerce.date().nullish(),
  last_updated: z.coerce.date().nullish(),
  reason: z.string().nullish(),
})
export type Sibling = z.infer<typeof SiblingSchema>

export const SnapshotPackingSchema = z.object({
  pack_hash: z.string().nullish(),
  snapshot_id: z.string().nullish(),
})
export type SnapshotPacking = z.infer<typeof SnapshotPackingSchema>

export const StatusHistorySchema = z.object({
  date_delivered: z.coerce.date().nullish(),
  date_cancelled: z.coerce.date().nullish(),
  date_first_visit: z.coerce.date().nullish(),
  date_not_delivered: z.coerce.date().nullish(),
  date_ready_to_ship: z.coerce.date().nullish(),
  date_returned: z.coerce.date().nullish(),
  date_shipped: z.coerce.date().nullish(),
  date_handling: z.coerce.date().nullish(),
})
export type StatusHistory = z.infer<typeof StatusHistorySchema>

export const SubstatusHistorySchema = z.object({
  substatus: z.string().nullish(),
  date: z.coerce.date().nullish(),
  status: z.string().nullish(),
})
export type SubstatusHistory = z.infer<typeof SubstatusHistorySchema>

export const TaxesSchema = z.object({
  amount: z.number().nullish(),
  id: z.null().nullish(),
  currency_id: z.string().nullish(),
})
export type Taxes = z.infer<typeof TaxesSchema>

export const ItemSchema = z.object({
  seller_custom_field: z.null().nullish(),
  global_price: z.null().nullish(),
  variation_attributes: z.array(VariationAttributeSchema).nullish(),
  condition: z.string().nullish(),
  seller_sku: z.string().nullish(),
  title: z.string().nullish(),
  net_weight: z.null().nullish(),
  id: z.string().nullish(),
  warranty: z.string().nullish(),
  category_id: z.string().nullish(),
  variation_id: z.number().nullish(),
  user_product_id: z.string().nullish(),
  release_date: z.null().nullish(),
})
export type Item = z.infer<typeof ItemSchema>

export const PaymentSchema = z.object({
  marketplace_fee: z.number().nullish(),
  shipping_cost: z.number().nullish(),
  payment_type: z.string().nullish(),
  authorization_code: z.string().nullish(),
  total_paid_amount: z.number().nullish(),
  status_detail: z.string().nullish(),
  deferred_period: z.null().nullish(),
  reason: z.string().nullish(),
  site_id: z.string().nullish(),
  issuer_id: z.string().nullish(),
  card_id: z.number().nullish(),
  transaction_amount: z.number().nullish(),
  order_id: z.number().nullish(),
  status: z.string().nullish(),
  available_actions: z.array(z.string()).nullish(),
  coupon_id: z.null().nullish(),
  transaction_order_id: z.null().nullish(),
  atm_transfer_reference: AtmTransferReferenceSchema.nullish(),
  transaction_amount_refunded: z.number().nullish(),
  status_code: z.null().nullish(),
  date_created: z.coerce.date().nullish(),
  installment_amount: z.number().nullish(),
  collector: MediationSchema.nullish(),
  taxes_amount: z.number().nullish(),
  reference_id: z.null().nullish(),
  date_approved: z.coerce.date().nullish(),
  overpaid_amount: z.number().nullish(),
  coupon_amount: z.number().nullish(),
  currency_id: z.string().nullish(),
  id: z.number().nullish(),
  installments: z.number().nullish(),
  operation_type: z.string().nullish(),
  payment_method_id: z.string().nullish(),
  activation_uri: z.null().nullish(),
  payer_id: z.number().nullish(),
  date_last_modified: z.coerce.date().nullish(),
})
export type Payment = z.infer<typeof PaymentSchema>

export const AgencySchema = z.object({
  'carrier_id': z.number().nullish(),
  'phone': z.string().nullish(),
  'agency_id': z.string().nullish(),
  'description': z.string().nullish(),
  'type': z.string().nullish(),
  'open_hours': z.string().nullish(),
})
export type Agency = z.infer<typeof AgencySchema>

export const ErAddressSchema = z.object({
  id: z.number().nullish(),
  receiver_name: z.string().nullish(),
  location_id: z.number().nullish(),
  geolocation_last_updated: z.coerce.date().nullish(),
  receiver_phone: z.string().nullish(),
  state: CitySchema.nullish(),
  latitude: z.number().nullish(),
  country: CitySchema.nullish(),
  neighborhood: CitySchema.nullish(),
  delivery_preference: z.string().nullish(),
  municipality: CitySchema.nullish(),
  zip_code: z.string().nullish(),
  types: z.array(z.string()).nullish(),
  agency: AgencySchema.nullish(),
  street_name: z.string().nullish(),
  geolocation_source: z.string().nullish(),
  city: CitySchema.nullish(),
  intersection: z.null().nullish(),
  comment: z.string().nullish(),
  node: NodeSchema.nullish(),
  street_number: z.string().nullish(),
  address_line: z.string().nullish(),
  scoring: z.number().nullish(),
  longitude: z.number().nullish(),
  geolocation_type: z.string().nullish(),
})
export type ErAddress = z.infer<typeof ErAddressSchema>

export const ShippingItemSchema = z.object({
  quantity: z.number().nullish(),
  dimensions_source: DimensionsSourceSchema.nullish(),
  user_product_id: z.string().nullish(),
  dimensions: z.string().nullish(),
  packaging_boxes_number: z.null().nullish(),
  sender_id: z.number().nullish(),
  domain_id: z.null().nullish(),
  id: z.string().nullish(),
  description: z.string().nullish(),
})
export type ShippingItem = z.infer<typeof ShippingItemSchema>

export const EstimatedDeliveryTimeSchema = z.object({
  time_frame: PickupPromiseSchema.nullish(),
  pay_before: z.coerce.date().nullish(),
  handling: z.number().nullish(),
  type: z.string().nullish(),
  shipping: z.number().nullish(),
  unit: z.string().nullish(),
  offset: OffsetSchema.nullish(),
  schedule: z.null().nullish(),
  date: z.coerce.date().nullish(),
})
export type EstimatedDeliveryTime = z.infer<typeof EstimatedDeliveryTimeSchema>

export const PickedQuantitySchema = z.object({
  measure: z.string().nullish(),
  value: z.number().nullish(),
})

export type PickedQuantity = z.infer<typeof PickedQuantitySchema>

export const OrderItemSchema = z.object({
  manufacturing_days: z.null().nullish(),
  compat_id: z.null().nullish(),
  base_currency_id: z.null().nullish(),
  discounts: z.null().nullish(),
  bundle: z.null().nullish(),
  element_id: z.number().nullish(),
  full_unit_price: z.number().nullish(),
  sale_fee: z.number().nullish(),
  unit_price: z.number().nullish(),
  base_exchange_rate: z.null().nullish(),
  requested_quantity: RequestedQuantitySchema.nullish(),
  picked_quantity: PickedQuantitySchema.nullish(),
  currency_id: z.string().nullish(),
  item: ItemSchema.nullish(),
  stock: StockSchema.nullish(),
  full_unit_price_currency_id: z.string().nullish(),
  quantity: z.number().nullish(),
  listing_type_id: z.string().nullish(),
})
export type OrderItem = z.infer<typeof OrderItemSchema>

export const ShippingOptionSchema = z.object({
  estimated_delivery_extended: EstimatedDeliverySchema.nullish(),
  shipping_method_id: z.number().nullish(),
  buffering: BufferingSchema.nullish(),
  estimated_delivery_limit: EstimatedDeliverySchema.nullish(),
  priority_class: PriorityClassSchema.nullish(),
  delivery_promise: z.string().nullish(),
  processing_time: z.null().nullish(),
  delivery_type: z.string().nullish(),
  id: z.number().nullish(),
  currency_id: z.string().nullish(),
  estimated_delivery_time: EstimatedDeliveryTimeSchema.nullish(),
  name: z.string().nullish(),
  estimated_schedule_limit: BufferingSchema.nullish(),
  list_cost: z.number().nullish(),
  estimated_handling_limit: BufferingSchema.nullish(),
  estimated_delivery_final: EstimatedDeliverySchema.nullish(),
  cost: z.number().nullish(),
  pickup_promise: PickupPromiseSchema.nullish(),
})
export type ShippingOption = z.infer<typeof ShippingOptionSchema>

export const ShippingSchema = z.object({
  snapshot_packing: SnapshotPackingSchema.nullish(),
  sender_address: ErAddressSchema.nullish(),
  priority_class: PriorityClassSchema.nullish(),
  status: z.string().nullish(),
  sibling: SiblingSchema.nullish(),
  substatus_history: z.array(SubstatusHistorySchema).nullish(),
  shipping_items: z.array(ShippingItemSchema).nullish(),
  base_cost: z.number().nullish(),
  order_cost: z.number().nullish(),
  carrier_info: z.any().nullish(),
  id: z.number().nullish(),
  tracking_number: z.string().nullish(),
  receiver_id: z.number().nullish(),
  tracking_method: z.string().nullish(),
  return_details: z.any().nullish(),
  mode: z.string().nullish(),
  sender_id: z.number().nullish(),
  return_tracking_number: z.string().nullish(),
  substatus: z.string().nullish(),
  logistic_type: z.string().nullish(),
  market_place: z.string().nullish(),
  shipping_option: ShippingOptionSchema.nullish(),
  customer_id: z.string().nullish(),
  last_updated: z.coerce.date().nullish(),
  date_created: z.coerce.date().nullish(),
  quotation: z.any().nullish(),
  service_id: z.number().nullish(),
  comments: z.any().nullish(),
  application_id: z.any().nullish(),
  type: z.string().nullish(),
  items_types: z.array(z.string()).nullish(),
  created_by: z.string().nullish(),
  tags: z.array(z.any()).nullish(),
  receiver_address: ErAddressSchema.nullish(),
  cost_components: CostComponentsSchema.nullish(),
  order_id: z.number().nullish(),
  site_id: z.string().nullish(),
  date_first_printed: z.coerce.date().nullish(),
  status_history: StatusHistorySchema.nullish(),
})
export type Shipping = z.infer<typeof ShippingSchema>
export const CancelDetailSchema = z.object({
  'code': z.string().nullish(),
  'date': z.coerce.date().nullish(),
  'application_id': z.string().nullish(),
  'group': z.string().nullish(),
  'description': z.string().nullish(),
  'requested_by': z.string().nullish(),
})

export type CancelDetail = z.infer<typeof CancelDetailSchema>

export const MlGetOrdersFirebaseElementSchema = z.object({
  shipping_cost: z.null().nullish(),
  status_detail: z.null().nullish(),
  mediations: z.array(MediationSchema).nullish(),
  buyer: BuyerSchema.nullish(),
  feedback: FeedbackSchema.nullish(),
  date_closed: z.coerce.date().nullish(),
  cancel_detail: CancelDetailSchema.nullish(),
  shipping: ShippingSchema.nullish(),
  order_items: z.array(OrderItemSchema).nullish(),
  fulfilled: z.boolean().nullish(),
  expiration_date: z.coerce.date().nullish(),
  taxes: TaxesSchema.nullish(),
  id: z.number().nullish(),
  context: ContextSchema.nullish(),
  comment: z.null().nullish(),
  manufacturing_ending_date: z.null().nullish(),
  paid_amount: z.number().nullish(),
  status: z.string().nullish(),
  buying_mode: z.string().nullish(),
  internal_tags: z.array(z.string()).nullish(),
  application_id: z.null().nullish(),
  hidden_for_seller: z.null().nullish(),
  pickup_id: z.null().nullish(),
  currency_id: z.string().nullish(),
  pack_id: z.number().nullish(),
  date_created: z.coerce.date().nullish(),
  tags: z.array(z.string()).nullish(),
  payments: z.array(PaymentSchema).nullish(),
  coupon: CouponSchema.nullish(),
  purchase_id: z.null().nullish(),
  last_updated: z.coerce.date().nullish(),
  seller: BuyerSchema.nullish(),
  total_amount: z.number().nullish(),
  order_request: OrderRequestSchema.nullish(),
  date_last_updated: z.coerce.date().nullish(),
})

export type MlGetOrdersFirebaseElement = z.infer<typeof MlGetOrdersFirebaseElementSchema>
