import pfpImage from '../assets/pfp.jpg';

export interface CardProfile {
  name: string;
  pfpUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  telegramUrl: string;
  email: string;
}

export const CARD_PROFILE: CardProfile = {
  name: 'Yuki Ayasawa',
  pfpUrl: pfpImage,
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com',
  telegramUrl: 'https://t.me',
  email: 'ayasawa.yuki@gmail.com',
};
