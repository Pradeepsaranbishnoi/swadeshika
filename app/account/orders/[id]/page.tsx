import OrderDetailContent from "@/components/order-detail-content"

export const metadata = {
  title: "Order Details - Swadeshika",
  description: "View your order details and tracking information",
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailContent orderId={params.id} />
}
