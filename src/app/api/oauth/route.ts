import { doc, setDoc } from "@firebase/firestore"
import { NextResponse } from "next/server"
import { firestore } from "@/lib/firebase"

export async function GET() {
  const data = await setDoc(doc(firestore, "oauth/token"), {
    access_token: "APP_USR-6132377044584373-112009-26b9cb5731d07da375284aafb1943d07-740458955",
    token_type: "Bearer",
    expires_in: 21600,
    scope: "offline_access read",
    user_id: 740458955,
    refresh_token: "TG-673de346b298ce0001a632a8-740458955",
  })

  return NextResponse.json({ data, status: 200 })
}
