export default function sitemap() {
  const baseUrl = 'https://mathaschool.in';

  // Core pages
  const routes = [
    '',
    '/about',
    '/academics',
    '/admissions',
    '/activities',
    '/faculty',
    '/gallery',
    '/news',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}

