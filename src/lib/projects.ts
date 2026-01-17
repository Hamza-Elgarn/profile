// Project data with images
export interface Project {
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    techStack: string[];
    category: string;
    images: string[];
    features: string[];
}

export const projects: Project[] = [
    {
        slug: 'tijara-pos',
        title: 'Tijara-POS',
        description: 'A comprehensive Point-of-Sale system built for modern retail. Features real-time inventory tracking, multi-payment support, and intelligent analytics dashboard.',
        fullDescription: 'Tijara-POS is a complete Point-of-Sale solution designed for modern retail businesses. It provides real-time inventory management, supports multiple payment methods, and includes a powerful analytics dashboard for business insights.',
        techStack: ['Python', 'Flask', 'SQLite', 'JavaScript'],
        category: 'System Design',
        images: [
            '/projects/tijara-pos/1.png',
            '/projects/tijara-pos/2.png',
            '/projects/tijara-pos/3.png',
            '/projects/tijara-pos/4.png',
        ],
        features: [
            'Real-time inventory tracking',
            'Multi-payment support',
            'Analytics dashboard',
            'Invoice generation',
        ]
    },
    {
        slug: 'suraya',
        title: 'Suraya',
        description: 'Premium e-commerce platform with seamless checkout experience, personalized recommendations, and an elegant UI designed for conversion.',
        fullDescription: 'Suraya is a premium e-commerce platform specializing in luxury products. It features a seamless checkout experience, personalized product recommendations, and an elegant user interface optimized for high conversion rates.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
        category: 'E-Commerce',
        images: [
            '/projects/suraya/1.png',
            '/projects/suraya/2.png',
            '/projects/suraya/3.png',
        ],
        features: [
            'Seamless checkout',
            'Personalized recommendations',
            'Elegant UI design',
            'Inventory management',
        ]
    },
    {
        slug: 'school-transit',
        title: 'School Transit',
        description: 'Smart transportation management system for schools. Real-time GPS tracking, route optimization, and parent notification system.',
        fullDescription: 'School Transit is an intelligent transportation management system designed for educational institutions. It provides real-time GPS tracking of school buses, route optimization algorithms, and an automated parent notification system for safety and convenience.',
        techStack: ['Python', 'C', 'PostgreSQL', 'React Native'],
        category: 'IoT / Tracking',
        images: [
            '/projects/school-transit/1.png',
            '/projects/school-transit/2.png',
            '/projects/school-transit/3.png',
            '/projects/school-transit/4.png',
            '/projects/school-transit/5.png',
            '/projects/school-transit/6.png',
            '/projects/school-transit/7.png',
            '/projects/school-transit/8.png',
        ],
        features: [
            'Real-time GPS tracking',
            'Route optimization',
            'Parent notifications',
            'Driver management',
            'Safety monitoring',
        ]
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return projects.map(p => p.slug);
}
