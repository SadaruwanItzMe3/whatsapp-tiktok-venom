const axios = require('axios');

async function downloadTikTok(url) {
  try {
    const { data } = await axios.get(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
    if (data.video?.url) {
      return data.video.url;
    } else {
      throw new Error('Invalid TikTok URL or video not found.');
    }
  } catch (error) {
    console.error('TikTok download error:', error.message);
    throw error;
  }
}

async function getRandomTikToks(count = 5) {
  try {
    const { data } = await axios.get('https://api.tiklydown.me/api/trending');
    const videos = data.videos || [];
    const randomVideos = videos.slice(0, count).map((v) => v.video.url);
    return randomVideos;
  } catch (error) {
    console.error('Random TikTok error:', error.message);
    throw error;
  }
}

module.exports = {
  downloadTikTok,
  getRandomTikToks,
};
