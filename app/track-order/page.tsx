import type { Metadata } from "next"
import TrackOrderContent from "@/components/track-order-content"

export const metadata: Metadata = {
  title: "Track Order - Swadeshika",
  description: "Track your order status and delivery information",
}

export default function TrackOrderPage() {
  return <TrackOrderContent />
}
