import { getOrder } from "@/lib/productActions";

export default async function page({ params }) {
  const orderId = params.orderId;
  const order = await getOrder(orderId);

  return <div>{JSON.stringify(order)}</div>;
}
