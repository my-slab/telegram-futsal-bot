import Telegraf from 'telegraf';

const API_TOKEN = process.env.TELEGRAM_API_TOKEN || '';
const bot = new Telegraf(API_TOKEN);

export const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

export default bot;
