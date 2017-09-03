import Telegraf from 'telegraph';

const API_TOKEN = '';
const bot = new Telegraf(API_TOKEN);

export const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

export default bot;
