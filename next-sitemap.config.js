/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zsoltardai.xyz',
  generateRobotsTxt: true,
  exclude: ['/dashboard'],
}
