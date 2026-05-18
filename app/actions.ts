"use server";

import { getDb } from "@/lib/db";
import { BarberShop, BusinessHour, Services } from "@/lib/intefaces";
import { formatCLP } from "@/lib/utils";
import { ObjectId } from "mongodb";


const COLLECTIONS = {
  USERS: "users",
  BARBERSHOPS: "barbershops",
  BARBERS: "barbers",
  APPOINTMENTS: "appointments",
  CLIENTS: "clients",
  SUBSCRIPTIONS: "subscriptions",
  SERVICES: "services",
  PROMOTIONS: "promotions",
  REFERRALS: "referrals",
} as const;


const barbershopId = process.env.BARBERSHOP_ID || undefined;

export async function getServices(): Promise<Services[]> {
  try {
    if (!barbershopId) return [];

    const db = await getDb();

    const data = await db.collection(COLLECTIONS.SERVICES).find({ barbershopId }).sort({ name: 'asc' }).toArray();

    return data.map(d => {

      return {
        id: d._id.toString(),
        name: d.name,
        desc: d.description,
        dur: `${d.durationMinutes} minutos`,
        price: `${formatCLP(d.price)}`
      } as Services
    })


  } catch (e) {
    return [];
  }

}

function buildSocial(handle?: string, url?: string, fallbackHandle?: string, fallbackUrl?: string) {
  const h = handle || fallbackHandle || "";
  const u = url || fallbackUrl || "";
  if (!h && !u) return undefined;
  return { handle: h, url: u } as import("@/lib/intefaces").SocialLink;
}

export async function getBarberShopById(): Promise<BarberShop | null> {
  try {
    if (!barbershopId) return null;

    const db = await getDb();
    const data = await db.collection(COLLECTIONS.BARBERSHOPS).findOne({ _id: new ObjectId(barbershopId) });

    if (!data) return null;

    return {
      gallery: data.galleryUrls || [],
      name: data.name || "",
      logo: data.logoUrl || "",
      street: data?.street || "",
      local: data?.local || "",
      city: data?.city || "",
      country: data?.country || "",
      businessHours: (data?.businessHours || []) as BusinessHour[],
      socials: {
        instagram: buildSocial(data.instagramHandle, data.instagramUrl, data.instagram),
        whatsapp: buildSocial(data.whatsappHandle, data.whatsappUrl, data.whatsapp),
        tiktok: buildSocial(data.tiktokHandle, data.tiktokUrl, data.tiktok),
        youtube: buildSocial(data.youtubeHandle, data.youtubeUrl, data.youtube),
      },
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
