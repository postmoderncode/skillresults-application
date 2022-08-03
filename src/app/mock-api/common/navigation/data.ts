/* tslint:disable:max-line-length */
import {
    FuseNavigationItem
} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'feather:grid',
                link: 'home/dashboard'
            },
            {
                id: 'public-profile',
                title: 'Public Profile',
                type: 'basic',
                icon: 'feather:user',
                link: 'home/public-profile/self'
            },
            {
                id: 'wishlist',
                title: 'Wishlist',
                type: 'basic',
                icon: 'heroicons_outline:sparkles',
                link: 'wishlist'
            },
        ]
    },
    {
        id: 'skills',
        title: 'skills',
        subtitle: 'Skill Management Area',
        type: 'group',
        children: [
            {
                id: 'my-skills',
                title: 'My Skills',
                type: 'basic',
                icon: 'feather:send',
                link: 'skills/my-skills'
            },
            {
                id: 'talents-hobbies',
                title: 'Talents & Hobbies',
                type: 'basic',
                icon: 'feather:heart',
                link: 'skills/talents-hobbies'
            }
        ]
    },
    {
        id: 'education',
        title: 'Education',
        subtitle: 'Education Tracking Area',
        type: 'group',
        children: [
            {
                id: 'degrees',
                title: 'Academic Degrees',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: 'education/academic-degrees'
            },
            {
                id: 'certifications-licenses',
                title: 'Certifications & Licenses',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: 'education/certifications-licenses'
            },
            {
                id: 'professional-training',
                title: 'Professional Training',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: 'education/professional-training'
            },
            {
                id: 'awards-accolades',
                title: 'Awards & Accolades',
                type: 'basic',
                icon: 'feather:award',
                link: 'education/awards-accolades'
            }
        ]
    },
    {
        id: 'report',
        title: 'Reports',
        subtitle: 'SkillResults Built-in Reports',
        type: 'group',
        children: [
            {
                id: 'people-browser',
                title: 'People Browser',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: 'reports/people-browser'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'feather:bar-chart-2',
                link: 'reports/report-catalog'
            },
            {
                id: 'teams',
                title: 'Teams',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'teams'
            },


        ]
    },
    {
        id: 'administration',
        title: 'Administration',
        subtitle: 'SkillResults Administration Area',
        admin: true,
        type: 'group',
        children: [
            {
                id: 'skill-catalog',
                title: 'Skill Catalog',
                type: 'basic',
                icon: 'heroicons_outline:pencil',
                link: 'administration/skill-catalog'
            },
            {
                id: 'administration-reports',
                title: 'Administration Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/admin-reports'
            },
            {
                id: 'positions',
                title: 'Positions',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'administration/positions'
            },
            {
                id: 'global-settings',
                title: 'Global Settings',
                type: 'basic',
                icon: 'feather:settings',
                link: 'administration/global-settings'
            },


        ]
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        subtitle: 'Home Area',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/dashboard'
            },
            {
                id: 'public-profile',
                title: 'Public Profile',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/public-profile/self'
            },
            {
                id: 'my-settings',
                title: 'My Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/my-settings'
            }
        ]
    },
    {
        id: 'skills',
        title: 'skills',
        subtitle: 'Skill Management Area',
        type: 'group',
        children: [
            {
                id: 'my-skills',
                title: 'My Skills',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/my-skills'
            },
            {
                id: 'skill-wishlist',
                title: 'Skill Wishlist',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/skill-wishlist'
            },
            {
                id: 'talents-hobbies',
                title: 'Talents & Hobbies',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/talents-hobbies'
            }
        ]
    },
    {
        id: 'education',
        title: 'Education',
        subtitle: 'Education Tracking Area',
        type: 'group',
        children: [
            {
                id: 'degrees',
                title: 'Academic Degrees',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/degrees'
            },
            {
                id: 'certifications-licenses',
                title: 'Certifications & Licenses',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/certifications-licenses'
            },
            {
                id: 'professional-training',
                title: 'Professional Training',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/talents-hobbies'
            },
            {
                id: 'awards-accolades',
                title: 'Awards & Accolades',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/awards-accolades'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        subtitle: 'SkillResults Built-in Reports',
        type: 'group',
        children: [
            {
                id: 'people-browser',
                title: 'People Browser',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: 'reports/people-browser'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
            },
            {
                id: 'teams',
                title: 'Teams',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'teams'
            },

        ]
    },
    {
        id: 'administration',
        title: 'Administration',
        subtitle: 'SkillResults Administration Area',
        type: 'group',
        children: [
            {
                id: 'skill-catalog',
                title: 'Skill Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/skill-catalog'
            },
            {
                id: 'administration-reports',
                title: 'Administration Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/administration-reports'
            },
            {
                id: 'positions',
                title: 'Positions',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'administration/positions'
            },
            {
                id: 'global-settings',
                title: 'Global Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/global-settings'
            },


        ]
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [


    {
        id: 'home',
        title: 'Home',
        type: 'group',
        children: [

            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'feather:grid',
                link: 'home/dashboard'
            },
            {
                id: 'public-profile',
                title: 'Public Profile',
                type: 'basic',
                icon: 'feather:user',
                link: 'home/public-profile/self'
            },
            {
                id: 'wishlist',
                title: 'Wishlist',
                type: 'basic',
                icon: 'heroicons_outline:sparkles',
                link: 'wishlist'
            },
            {
                id: 'administration',
                title: 'Administration',
                admin: true,
                type: 'collapsable',
                icon: 'heroicons_outline:identification',
                children: [
                    {
                        id: 'skill-catalog',
                        title: 'Skill Catalog',
                        type: 'basic',
                        icon: 'heroicons_outline:pencil',
                        link: 'administration/skill-catalog'
                    },
                    {
                        id: 'administration-reports',
                        title: 'Administration Reports',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: 'administration/admin-reports'
                    },
                    {
                        id: 'positions',
                        title: 'Positions',
                        type: 'basic',
                        icon: 'heroicons_solid:user-group',
                        link: 'administration/positions'
                    },
                    {
                        id: 'global-settings',
                        title: 'Global Settings',
                        type: 'basic',
                        icon: 'feather:settings',
                        link: 'administration/global-settings'
                    },


                ]
            },
        ]
    },
    {
        id: 'skills',
        title: 'skills',
        type: 'group',
        children: [
            {
                id: 'my-skills',
                title: 'My Skills',
                type: 'basic',
                icon: 'feather:send',
                link: 'skills/my-skills'
            },
            {
                id: 'talents-hobbies',
                title: 'Talents & Hobbies',
                type: 'basic',
                icon: 'feather:heart',
                link: 'skills/talents-hobbies'
            }
        ]
    },
    {
        id: 'education',
        title: 'Education',
        type: 'group',
        children: [
            {
                id: 'degrees',
                title: 'Academic Degrees',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: 'education/academic-degrees'
            },
            {
                id: 'certifications-licenses',
                title: 'Certifications & Licenses',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: 'education/certifications-licenses'
            },
            {
                id: 'professional-training',
                title: 'Professional Training',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: 'education/professional-training'
            },
            {
                id: 'awards-accolades',
                title: 'Awards & Accolades',
                type: 'basic',
                icon: 'feather:award',
                link: 'education/awards-accolades'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        children: [
            {
                id: 'people-browser',
                title: 'People Browser',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: 'reports/people-browser'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'feather:bar-chart-2',
                link: 'reports/report-catalog'
            },
            {
                id: 'teams',
                title: 'Teams',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'teams'
            },

        ]
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        subtitle: 'Home Area',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/dashboard'
            },
            {
                id: 'public-profile',
                title: 'Public Profile',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/public-profile/self'
            },
            {
                id: 'my-settings',
                title: 'My Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'home/my-settings'
            }
        ]
    },
    {
        id: 'skills',
        title: 'skills',
        subtitle: 'Skill Management Area',
        type: 'group',
        children: [
            {
                id: 'my-skills',
                title: 'My Skills',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/my-skills'
            },
            {
                id: 'skill-wishlist',
                title: 'Skill Wishlist',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/skill-wishlist'
            },
            {
                id: 'talents-hobbies',
                title: 'Talents & Hobbies',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'skills/talents-hobbies'
            }
        ]
    },
    {
        id: 'education',
        title: 'Education',
        subtitle: 'Education Tracking Area',
        type: 'group',
        children: [
            {
                id: 'degrees',
                title: 'Academic Degrees',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/degrees'
            },
            {
                id: 'certifications-licenses',
                title: 'Certifications & Licenses',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/certifications-licenses'
            },
            {
                id: 'professional-training',
                title: 'Professional Training',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/talents-hobbies'
            },
            {
                id: 'awards-accolades',
                title: 'Awards & Accolades',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'education/awards-accolades'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        subtitle: 'SkillResults Built-in Reports',
        type: 'group',
        children: [
            {
                id: 'people-browser',
                title: 'People Browser',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: 'reports/people-browser'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
            },
            {
                id: 'teams',
                title: 'Teams',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'teams'
            },
        ]
    },
    {
        id: 'administration',
        title: 'Administration',
        subtitle: 'SkillResults Administration Area',
        type: 'group',
        children: [
            {
                id: 'skill-catalog',
                title: 'Skill Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/skill-catalog'
            },
            {
                id: 'administration-reports',
                title: 'Administration Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/administration-reports'
            },
            {
                id: 'positions',
                title: 'Positions',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: 'administration/positions'
            },
            {
                id: 'global-settings',
                title: 'Global Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/global-settings'
            },


        ]
    },
];
