import type { MlGetOrdersFirebaseElement } from '@/types/ml/firebase-orders'
import { firestore } from '@/lib/firebase'
import { MlGetOrdersFirebaseElementSchema } from '@/types/ml/firebase-orders'
import { collection } from '@firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const firebaseConverter = {
  toFirestore: (data: MlGetOrdersFirebaseElement) => MlGetOrdersFirebaseElementSchema.parse(data),
  fromFirestore: (snap: any) => {
    const data = snap.data() as MlGetOrdersFirebaseElement
    const safeParsed = MlGetOrdersFirebaseElementSchema.safeParse(data)

    if (!safeParsed.success || !data || !safeParsed.data) {
      console.group('Firebase Parse Error')
      console.log('Error: ', safeParsed.error)
      console.log('Data: ', data)
      console.groupEnd()
      return null
    }

    return safeParsed.data
  },
}

export function useOrders() {
  const [data, loading, error] = useCollectionData(collection(firestore, 'orders').withConverter(firebaseConverter))

  const filteredData = data?.filter(item => item?.payments?.[0]?.date_approved)
    .filter(item => item?.tags?.includes('not_delivered'))
    .filter(item => item?.status !== 'cancelled')
    .toSorted((lhs, rhs) => lhs?.payments?.[0]?.date_approved > rhs?.payments?.[0]?.date_approved ? -1 : 1)

  console.log(filteredData?.find(item => item?.id === 2000006716225141))

  const ordersGrouped = filteredData ? Object.groupBy(filteredData, item => item?.shipping?.logistic_type ?? 'unknown') : {}

  // const ordersGrouped = filteredData ? Object.groupBy(filteredData, item => item?.shipping?.status ?? 'unknown') : {}
  const groupedByShippmentStatus = Object.entries(ordersGrouped).map(([key, value]) => ({
    key,
    object: value ? Object.groupBy(value, item => item?.shipping?.status ?? 'unknown') : []
  }))

  console.log('ordersGrouped', groupedByShippmentStatus)

  return { data, loading, error }
}
