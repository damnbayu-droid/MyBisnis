import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mybisnis.app' // Replace with actual domain

    // Main pages
    const routes = [
        '',
        '/marketplace',
        '/proposal',
        '/help-support',
        '/auth/login',
        '/auth/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }))

    // Demo pages
    const demoRoutes = [
        '/demo/store',
        '/demo/lapak',
        '/demo/driver',
        '/demo/akun',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...demoRoutes]
}
