"use server";

import path from "path";
import { readFile, writeFile } from "./fsFunctions";
import { deliveryTime, watingTimeCalc } from "./constants";
import { nanoid } from "nanoid";
const projectRoot = process.cwd();
const dbPath = path.join(projectRoot, "/data/db.json");

export const getProducts = async () => {
  try {
    const fileContent = await readFile(dbPath);

    const data = JSON.parse(fileContent);

    return { products: data?.products, error: null };
  } catch (err) {
    console.error(err);
    return { products: [], error: err.message };
  }
};

export const createOrder = async ({ order }) => {
  try {
    const { name, number, address, products } = order;

    if (!name) return toast.error("نام را وارد نمائید!");
    if (!number) return toast.error("شماره تماس را وارد نمائید!");
    if (number.length !== 11)
      return toast.error("شماره تماس باید یازده رقم باشد!");
    if (!address) return toast.error("آدرس را وارد نمائید!");
    if (products?.length < 1) return toast.error("سبد خرید خالی می‌باشد!");

    const fileContent = await readFile(dbPath);
    const data = JSON.parse(fileContent);

    const orders = data?.orders || [];

    const now = new Date();
    const unix = Math.floor(now.getTime() / 1000) + 1;

    const totalProductCount = products.reduce((acc, cur) => acc + cur.count, 0);

    const acceptedAt = unix + 120;
    const preparedAt = watingTimeCalc(totalProductCount) + unix;
    const deliveredAt = deliveryTime() + preparedAt;
    const sentAt = deliveredAt - 120;

    // generate id
    let id;
    do {
      id = nanoid(6).toLowerCase();
    } while (orders.find((o) => o.id === id));

    const totalProducts = products.reduce((acc, cur) => acc + cur.count, 0);
    const totalAmount = products.reduce((acc, cur) => acc + cur.total, 0);

    const newOrders = [
      ...orders,
      {
        id,
        ...order,
        totalAmount,
        totalProducts,
        createdAt: unix,
        acceptedAt,
        preparedAt,
        sentAt,
        deliveredAt,
      },
    ];

    await writeFile(dbPath, JSON.stringify({ ...data, orders: newOrders }));

    return {
      status: "success",
      message: "سفارش شما با موفقیت ثبت شد.",
      data: { id },
    };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: "خطا در ثبت سفارش!" };
  }
};

export const getOrder = async (orderId) => {
  try {
    const fileContent = await readFile(dbPath);

    const data = JSON.parse(fileContent);
    const order = data?.orders?.find((ord) => ord.id === orderId);

    if (!order) {
      return { status: "fail", message: `سفارش با آیدی ${orderId}  یافت نشد!` };
    }

    const now = Math.floor(new Date().getTime() / 1000);
    let currentStep = 1;
    if (now >= order.deliveredAt) {
      currentStep = 5;
    } else if (now >= order.preparedAt) {
      currentStep = 3;
    } else if (now >= order.acceptedAt) {
      currentStep = 2;
    }

    return { status: "success", data: { ...order, currentStep } };
  } catch (err) {
    console.error(err);
    return { status: "fail", message: "خطا در سمت سرور!" };
  }
};
