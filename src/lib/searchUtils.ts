// searchUtils.ts - Search functionality utilities

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'product' | 'page' | 'blog' | 'service';
  category?: string;
  tags?: string[];
}

// Mock data for search - in a real application, this would come from a database or API
export const searchableItems: SearchableItem[] = [
  // Pages
  {
    id: '1',
    title: 'Home',
    description: 'NovaGen Automation homepage with featured products and services',
    url: '/',
    type: 'page'
  },
  {
    id: '2',
    title: 'About Us',
    description: 'Learn about NovaGen Automation, our mission, vision, and values',
    url: '/about',
    type: 'page'
  },
  {
    id: '3',
    title: 'Contact Us',
    description: 'Get in touch with our team for inquiries and support',
    url: '/contact',
    type: 'page'
  },
  {
    id: '4',
    title: 'Products',
    description: 'Browse our comprehensive range of industrial automation products',
    url: '/products',
    type: 'page'
  },
  {
    id: '5',
    title: 'Vision & Mission',
    description: 'Our company vision and mission statement',
    url: '/vision',
    type: 'page'
  },
  {
    id: '6',
    title: 'Gallery',
    description: 'View our product and facility images',
    url: '/gallery',
    type: 'page'
  },
  {
    id: '7',
    title: 'Blog',
    description: 'Latest news and articles from NovaGen Automation',
    url: '/blog',
    type: 'page'
  },
  
  // Products
  {
    id: '101',
    title: 'AC Drives',
    description: 'Variable frequency drives for precise motor control and energy efficiency',
    url: '/products/danfoss',
    type: 'product',
    category: 'Danfoss',
    tags: ['drive', 'motor', 'control', 'energy', 'automation']
  },
  {
    id: '102',
    title: 'Soft Starters',
    description: 'Smooth motor starting to reduce mechanical stress and electrical disturbances',
    url: '/products/danfoss',
    type: 'product',
    category: 'Danfoss',
    tags: ['motor', 'starter', 'control', 'protection']
  },
  {
    id: '103',
    title: 'Harmonic Filters',
    description: 'Active and passive harmonic filters for power quality improvement',
    url: '/products/danfoss',
    type: 'product',
    category: 'Danfoss',
    tags: ['power', 'quality', 'filter', 'THID']
  },
  {
    id: '104',
    title: 'Pressure Transmitters',
    description: 'High-precision pressure measurement for industrial applications',
    url: '/products/danfoss',
    type: 'product',
    category: 'Danfoss',
    tags: ['pressure', 'sensor', 'measurement', 'control']
  },
  {
    id: '105',
    title: 'Servo Motors',
    description: 'High-precision servo motors for demanding automation applications',
    url: '/products/siemens',
    type: 'product',
    category: 'Siemens',
    tags: ['servo', 'motor', 'precision', 'control']
  },
  {
    id: '106',
    title: 'Servo Drives',
    description: 'Advanced servo drives for precise motion control',
    url: '/products/siemens',
    type: 'product',
    category: 'Siemens',
    tags: ['servo', 'drive', 'motion', 'control']
  },
  {
    id: '107',
    title: 'PLC Modules',
    description: 'Programmable Logic Controller modules for industrial automation',
    url: '/products/siemens',
    type: 'product',
    category: 'Siemens',
    tags: ['PLC', 'controller', 'automation', 'module']
  },
  {
    id: '108',
    title: 'HMI/Touch Panels',
    description: 'Human Machine Interface panels for intuitive control',
    url: '/products/siemens',
    type: 'product',
    category: 'Siemens',
    tags: ['HMI', 'touch', 'panel', 'interface']
  },
  {
    id: '109',
    title: 'Control Panels',
    description: 'Custom-designed automation panels with complete installation service',
    url: '/products/panel',
    type: 'product',
    category: 'Panel',
    tags: ['panel', 'control', 'custom', 'installation']
  },
  {
    id: '110',
    title: 'Dynamic Braking Resistors',
    description: 'Dynamic braking resistors for effective motor braking',
    url: '/products/dbr',
    type: 'product',
    category: 'DBR',
    tags: ['braking', 'resistor', 'motor', 'dynamic']
  },
  
  // Services
  {
    id: '201',
    title: 'Technical Support',
    description: 'Expert assistance for installation, configuration, and troubleshooting',
    url: '/services',
    type: 'service',
    tags: ['support', 'technical', 'installation', 'troubleshooting']
  },
  {
    id: '202',
    title: 'Training Programs',
    description: 'Professional training for operators and maintenance staff',
    url: '/services',
    type: 'service',
    tags: ['training', 'education', 'operator', 'maintenance']
  },
  {
    id: '203',
    title: 'Maintenance Services',
    description: 'Preventive maintenance and repair services to maximize uptime',
    url: '/services',
    type: 'service',
    tags: ['maintenance', 'repair', 'preventive', 'uptime']
  }
];

// Search function
export const searchItems = (query: string, items: SearchableItem[] = searchableItems): SearchableItem[] => {
  if (!query.trim()) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);
  
  return items.filter(item => {
    // Check title
    if (item.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Check description
    if (item.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Check category
    if (item.category && item.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Check tags
    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Check individual words
    if (queryWords.some(word => 
      item.title.toLowerCase().includes(word) || 
      item.description.toLowerCase().includes(word) ||
      (item.category && item.category.toLowerCase().includes(word)) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(word)))
    )) {
      return true;
    }
    
    return false;
  }).slice(0, 10); // Limit to 10 results
};

// Group search results by type
export const groupSearchResults = (results: SearchableItem[]) => {
  return results.reduce((groups, item) => {
    const type = item.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {} as Record<string, SearchableItem[]>);
};