// src/pages/api/sitemap.js
export default function handler(req, res) {
    const baseUrl = "https://www.hotelsudarshan.com";
    const pages = [
      "/",
      "/aboutus",
      "/rooms",
      "/amenities",
      "/aboutus",
    //   "/bookingonline",
      "/contact",
      "/privacypolicy",
      "/termandcondition",
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => `
          <url>
            <loc>${baseUrl}${page}</loc>
          </url>
        `)
        .join('')}
    </urlset>`;
  
    res.setHeader("Content-Type", "application/xml");
    res.status(200).end(sitemap);
  }
  