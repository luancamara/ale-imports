import * as z from 'zod'

export const CostComponentsSchema = z.object({
  loyal_discount: z.number(),
  special_discount: z.number(),
  compensation: z.number(),
  gap_discount: z.number(),
  ratio: z.number(),
})
export type CostComponents = z.infer<typeof CostComponentsSchema>

export const PriorityClassSchema = z.object({
  id: z.string(),
})
export type PriorityClass = z.infer<typeof PriorityClassSchema>

export const CitySchema = z.object({
  id: z.union([z.null(), z.string()]),
  name: z.union([z.null(), z.string()]),
})
export type City = z.infer<typeof CitySchema>

export const DimensionsSourceSchema = z.object({
  origin: z.string(),
  id: z.string(),
})
export type DimensionsSource = z.infer<typeof DimensionsSourceSchema>

export const BufferingSchema = z.object({
  date: z.union([z.coerce.date(), z.null()]),
})
export type Buffering = z.infer<typeof BufferingSchema>

export const EstimatedDeliverySchema = z.object({
  date: z.coerce.date(),
  offset: z.number(),
})
export type EstimatedDelivery = z.infer<typeof EstimatedDeliverySchema>

export const OffsetSchema = z.object({
  date: z.null(),
  shipping: z.null(),
})
export type Offset = z.infer<typeof OffsetSchema>

export const PickupPromiseSchema = z.object({
  from: z.null(),
  to: z.null(),
})
export type PickupPromise = z.infer<typeof PickupPromiseSchema>

export const SiblingSchema = z.object({
  reason: z.null(),
  sibling_id: z.null(),
  description: z.null(),
  source: z.null(),
  date_created: z.null(),
  last_updated: z.null(),
})
export type Sibling = z.infer<typeof SiblingSchema>

export const SnapshotPackingSchema = z.object({
  snapshot_id: z.string(),
  pack_hash: z.string(),
})
export type SnapshotPacking = z.infer<typeof SnapshotPackingSchema>

export const StatusHistorySchema = z.object({
  date_shipped: z.null(),
  date_returned: z.null(),
  date_delivered: z.null(),
  date_first_visit: z.null(),
  date_not_delivered: z.null(),
  date_cancelled: z.null(),
  date_handling: z.coerce.date(),
  date_ready_to_ship: z.coerce.date(),
})
export type StatusHistory = z.infer<typeof StatusHistorySchema>

export const SubstatusHistorySchema = z.object({
  date: z.coerce.date(),
  substatus: z.string(),
  status: z.string(),
})
export type SubstatusHistory = z.infer<typeof SubstatusHistorySchema>

export const ErAddressSchema = z.object({
  country: CitySchema,
  city: CitySchema,
  geolocation_type: z.string(),
  latitude: z.number(),
  municipality: CitySchema,
  location_id: z.number(),
  street_name: z.string(),
  zip_code: z.string(),
  intersection: z.null(),
  receiver_name: z.string().optional(),
  id: z.number(),
  state: CitySchema,
  longitude: z.number(),
  address_line: z.string(),
  types: z.array(z.string()),
  scoring: z.number(),
  agency: z.null(),
  geolocation_source: z.string(),
  delivery_preference: z.string().optional(),
  node: z.null(),
  street_number: z.string(),
  comment: z.union([z.null(), z.string()]),
  neighborhood: CitySchema,
  geolocation_last_updated: z.coerce.date(),
  receiver_phone: z.string().optional(),
})
export type ErAddress = z.infer<typeof ErAddressSchema>

export const ShippingItemSchema = z.object({
  quantity: z.number(),
  dimensions_source: DimensionsSourceSchema,
  description: z.string(),
  packaging_boxes_number: z.null(),
  id: z.string(),
  user_product_id: z.string(),
  sender_id: z.number(),
  dimensions: z.string(),
})
export type ShippingItem = z.infer<typeof ShippingItemSchema>

export const EstimatedDeliveryTimeSchema = z.object({
  date: z.coerce.date(),
  pay_before: z.coerce.date(),
  schedule: z.null(),
  unit: z.string(),
  offset: OffsetSchema,
  shipping: z.number(),
  time_frame: PickupPromiseSchema,
  handling: z.number(),
  type: z.string(),
})
export type EstimatedDeliveryTime = z.infer<typeof EstimatedDeliveryTimeSchema>

export const ShippingOptionSchema = z.object({
  processing_time: z.null(),
  cost: z.number(),
  estimated_schedule_limit: BufferingSchema,
  shipping_method_id: z.number(),
  estimated_delivery_final: EstimatedDeliverySchema,
  buffering: BufferingSchema,
  pickup_promise: PickupPromiseSchema,
  list_cost: z.number(),
  estimated_delivery_limit: EstimatedDeliverySchema,
  priority_class: PriorityClassSchema,
  delivery_promise: z.string(),
  delivery_type: z.string(),
  estimated_handling_limit: BufferingSchema,
  estimated_delivery_time: EstimatedDeliveryTimeSchema,
  name: z.string(),
  id: z.number(),
  estimated_delivery_extended: EstimatedDeliverySchema,
  currency_id: z.string(),
})
export type ShippingOption = z.infer<typeof ShippingOptionSchema>

export const MlGetShippingResponseSchema = z.object({
  substatus_history: z.array(SubstatusHistorySchema),
  snapshot_packing: SnapshotPackingSchema,
  receiver_id: z.number(),
  base_cost: z.number(),
  status_history: StatusHistorySchema,
  type: z.string(),
  return_details: z.null(),
  sender_id: z.number(),
  mode: z.string(),
  order_cost: z.number(),
  priority_class: PriorityClassSchema,
  service_id: z.number(),
  shipping_items: z.array(ShippingItemSchema),
  tracking_number: z.null(),
  cost_components: CostComponentsSchema,
  id: z.number(),
  tracking_method: z.string(),
  last_updated: z.coerce.date(),
  items_types: z.array(z.string()),
  comments: z.null(),
  substatus: z.string(),
  date_created: z.coerce.date(),
  date_first_printed: z.null(),
  created_by: z.string(),
  application_id: z.null(),
  shipping_option: ShippingOptionSchema,
  tags: z.array(z.any()),
  sender_address: ErAddressSchema,
  sibling: SiblingSchema,
  return_tracking_number: z.null(),
  site_id: z.string(),
  carrier_info: z.null(),
  market_place: z.string(),
  receiver_address: ErAddressSchema,
  customer_id: z.null(),
  order_id: z.number(),
  quotation: z.null(),
  status: z.string(),
  logistic_type: z.string(),
})
export type MlGetShippingResponse = z.infer<typeof MlGetShippingResponseSchema>
