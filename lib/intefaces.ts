export interface Services {
  id: string;
  name: string;
  desc: string;
  dur: string;
  price: string;
}

export interface SocialLink {
  handle: string;
  url: string;
}

export interface BusinessHour {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface BarberShop {
  gallery: string[];
  name: string;
  logo: string;
  street: string;
  local: string;
  city: string;
  country: string;
  businessHours: BusinessHour[];
  socials: {
    instagram?: SocialLink;
    whatsapp?: SocialLink;
    tiktok?: SocialLink;
    youtube?: SocialLink;
  };
}
