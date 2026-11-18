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
  instagramUrl: 'https://www.instagram.com/ayasawa_yuki/',
  tiktokUrl: 'https://www.tiktok.com/@ayasawa_yuki',
  telegramUrl: 'https://t.me/Ayasawa_yuki',
  email: 'ayasawa.yuki@gmail.com',
};
