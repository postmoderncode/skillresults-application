/* tslint:disable:max-line-length */
import {
    FuseNavigationItem
} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
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
                link: 'home/public-profile'
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
                link: 'skills/talent-hobbies'
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
                link: 'education/academic-degrees'
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
                link: 'education/professional-training'
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
                id: 'my-reports',
                title: 'My Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/my-reports'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
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
                link: 'administration/admin-reports'
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
                link: 'home/public-profile'
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
                link: 'skills/talent-hobbies'
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
                id: 'my-reports',
                title: 'My Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/my-reports'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
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
                link: 'home/public-profile'
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
                link: 'skills/talent-hobbies'
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
                id: 'my-reports',
                title: 'My Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/my-reports'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
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
                id: 'global-settings',
                title: 'Global Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/global-settings'
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
                link: 'home/public-profile'
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
                link: 'skills/talent-hobbies'
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
                id: 'my-reports',
                title: 'My Reports',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/my-reports'
            },
            {
                id: 'report-catalog',
                title: 'Report Catalog',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'reports/report-catalog'
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
                id: 'global-settings',
                title: 'Global Settings',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: 'administration/global-settings'
            },


        ]
    },
];
