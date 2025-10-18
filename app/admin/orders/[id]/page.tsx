import AdminOrderDetailContent from "@/components/admin-order-detail"

export const metadata = {
  title: "Order Details - Admin - Swadeshika",
  description: "Manage order details and status",
}

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  return <AdminOrderDetailContent orderId={params.id} />
}
