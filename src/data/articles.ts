export const SITE = "https://www.mindbodygreen.com";
const CDN = "https://mindbodygreen-res.cloudinary.com/image/upload";

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  sponsor?: string;
  publishedTime: string;
  modifiedTime?: string;
  tags: string[];
  image: string;
  thumbnail: string;
  twitterImage?: string;
  ldImage?: string;
  twitterCreator?: string;
  author: { name: string; url: string; image?: string };
  content: "vision-story";
}

const IMG = "org/1790104428970_a2ptbyetg4.png";

export const articles: Article[] = [
  {
    id: 69485,
    slug: "healthy-aging-essential-you-might-be-overlooking",
    title: "The Healthy Aging Essential You Might Be Overlooking",
    description: "The Healthy Aging Essential You Might Be Overlooking",
    category: "Integrative Health",
    sponsor: "VSP Vision Care",
    publishedTime: "2026-09-23T10:00:00.000Z",
    modifiedTime: "2026-10-08T14:46:02.141Z",
    tags: ["longevity", "partner"],
    image: `${CDN}/c_fill,w_2000,h_1200,g_auto,fl_lossy,f_jpg/${IMG}`,
    thumbnail: `${CDN}/c_fill,w_800,h_600,g_auto,q_85,fl_lossy,f_auto/${IMG}`,
    twitterImage: `${CDN}/c_crop,x_0,y_0,w_1597,h_892/c_fill,w_800,h_400,g_auto,q_85,fl_lossy,f_jpg/${IMG}`,
    ldImage: `${CDN}/c_crop,x_141,y_0,w_1338,h_893/c_fill,w_1200,h_800,g_auto,q_90,fl_lossy,f_jpg/${IMG}`,
    twitterCreator: "VSPVisionCare",
    author: {
      name: "Alexandra B. Engler",
      url: `${SITE}/wc/alexandra-b-engler`,
      image:
        "https://mindbodygreen-res.cloudinary.com/images/c_fill,w_250,h_250,g_face:center,q_85,fl_lossy,f_jpg/usr/UM6yIV5/Alexandra B. Engler.jpg",
    },
    content: "vision-story",
  },
];

export const articleUrl = (a: Article) => `/articles/${a.slug}`;

export const sortedArticles = () =>
  [...articles].sort((a, b) => b.publishedTime.localeCompare(a.publishedTime));

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "mindbodygreen",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    url: "https://mindbodygreen-res.cloudinary.com/image/upload/w_800,h_800/mbg_logo_short-square-2x.png",
    width: 800,
    height: 800,
  },
  sameAs: [
    "https://www.facebook.com/mindbodygreen",
    "https://x.com/mindbodygreen",
    "https://www.instagram.com/mindbodygreen",
    "https://www.pinterest.com/mindbodygreen/",
    "https://www.youtube.com/channel/UCxAB39SRMVabVZEOKTo6iVA",
    "https://www.tiktok.com/@mindbodygreen",
    "https://www.linkedin.com/company/mindbodygreen-com",
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "mindbodygreen",
  url: SITE,
  publisher: { "@id": `${SITE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE}/search?q={search_term}` },
    "query-input": "required name=search_term",
  },
};

export const articleLd = (a: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${articleUrl(a)}` },
  url: `${SITE}${articleUrl(a)}`,
  headline: a.title,
  publisher: { "@id": `${SITE}/#organization` },
  image: { "@type": "ImageObject", url: a.ldImage ?? a.image },
  datePublished: a.publishedTime,
  dateModified: a.modifiedTime ?? a.publishedTime,
  author: {
    "@type": "Person",
    name: a.author.name,
    "@id": `${a.author.url}#person`,
    url: a.author.url,
    ...(a.author.image ? { image: a.author.image } : {}),
  },
});
