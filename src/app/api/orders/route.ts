import { AxiosResponse } from "axios"
import { api } from "@/lib/axios"
import { today } from "@/lib/utils"
import { MlGetOrdersResponse } from "@/types/ml/orders"

export async function GET() {
  const { start, end } = today()

  const { data }: AxiosResponse<MlGetOrdersResponse> = await api.get("/orders/search", {
    params: {
      seller: "740458955",
      "order.date_created.from": start,
      "order.date_created.to": end,
    },
  })

  return Response.json({ data, status: 200 })
}
