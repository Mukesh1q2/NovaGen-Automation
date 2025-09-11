// chatbotUtils.ts - Chatbot functionality and knowledge base

// Product knowledge base
const productKnowledgeBase = [
  {
    category: "Danfoss Products",
    products: [
      {
        name: "AC Drives",
        description: "Variable frequency drives for precise motor control and energy efficiency. Power range from 0.37 kW to 90 kW (0.5 HP to 125 HP). Features include advanced motor control algorithms, built-in EMC filter, multiple communication protocols, and energy optimization function.",
        applications: [
          "Pumps and fans in HVAC systems",
          "Conveyor belts in manufacturing",
          "Mixers and agitators in chemical processing"
        ],
        benefits: [
          "Up to 30% energy savings",
          "Reduced maintenance costs",
          "Extended motor life"
        ]
      },
      {
        name: "Soft Starters",
        description: "Smooth motor starting to reduce mechanical stress and electrical disturbances. Features include reduced starting current, built-in protection, communication options, and user-friendly interface.",
        applications: [
          "Centrifugal pumps",
          "Conveyor systems",
          "Compressors"
        ],
        benefits: [
          "Reduced mechanical stress",
          "Lower peak current demand",
          "Smooth acceleration"
        ]
      },
      {
        name: "Harmonic Filters",
        description: "Active and passive harmonic filters for power quality improvement. Features include THID reduction, compliance with standards, modular design, and low maintenance.",
        applications: [
          "Industrial facilities",
          "Commercial buildings",
          "Data centers"
        ],
        benefits: [
          "Improved power quality",
          "Reduced harmonic distortion",
          "Compliance with regulations"
        ]
      },
      {
        name: "Pressure Transmitters",
        description: "High-precision pressure measurement for industrial applications. Features include high accuracy, robust construction, various output options, and easy calibration.",
        applications: [
          "Water management",
          "HVAC systems",
          "Process industries"
        ],
        benefits: [
          "High measurement accuracy",
          "Reliable operation",
          "Easy maintenance"
        ]
      }
    ]
  },
  {
    category: "Siemens Products",
    products: [
      {
        name: "Servo Motors",
        description: "High-precision servo motors for demanding automation applications. Features include precise positioning, high torque density, and robust construction.",
        applications: [
          "Machine tools",
          "Packaging machines",
          "Robotics"
        ],
        benefits: [
          "High precision",
          "Fast response",
          "Reliable performance"
        ]
      },
      {
        name: "Servo Drives",
        description: "Advanced servo drives for precise motion control. Features include high dynamics, multiple feedback interfaces, and integrated safety functions.",
        applications: [
          "CNC machines",
          "Assembly lines",
          "Material handling"
        ],
        benefits: [
          "Precise control",
          "High efficiency",
          "Integrated safety"
        ]
      },
      {
        name: "PLC Modules",
        description: "Programmable Logic Controller modules for industrial automation. Features include modular design, multiple I/O options, and easy programming.",
        applications: [
          "Manufacturing automation",
          "Process control",
          "Building automation"
        ],
        benefits: [
          "Flexible configuration",
          "Reliable operation",
          "Easy programming"
        ]
      }
    ]
  },
  {
    category: "Custom Solutions",
    products: [
      {
        name: "Control Panels",
        description: "Custom-designed automation panels with complete installation service. Features include EMC compliance, modular design, and comprehensive documentation.",
        applications: [
          "Industrial machinery",
          "Process plants",
          "Building systems"
        ],
        benefits: [
          "Tailored to requirements",
          "Complete solution",
          "Professional installation"
        ]
      },
      {
        name: "Dynamic Braking Resistors",
        description: "Dynamic braking resistors for effective motor braking. Features include high power handling, compact design, and reliable operation.",
        applications: [
          "Elevators",
          "Cranes",
          "Conveyor systems"
        ],
        benefits: [
          "Effective braking",
          "Compact design",
          "High reliability"
        ]
      }
    ]
  }
];

// Common questions and answers
const faqKnowledgeBase = [
  {
    question: "What industries do you serve?",
    answer: "We primarily serve the Punjab region and North India, but we can provide solutions and support across India based on project requirements. Our products are used in manufacturing, automotive, food & beverage, textile, pharmaceutical, water treatment, and power generation industries."
  },
  {
    question: "Do you provide after-sales support?",
    answer: "Yes, we provide comprehensive after-sales support including installation, maintenance, and technical assistance for all our products. Our team of experts is available to help you with any issues or questions you may have."
  },
  {
    question: "How can I get a quote for my project?",
    answer: "You can fill out the contact form on our website or call us directly at +91 98786-28680 or +91 70874-88699. Our team will get back to you with a detailed quote based on your requirements within 24-48 hours."
  },
  {
    question: "What brands do you work with?",
    answer: "We are authorized partners of Danfoss and Siemens, and we also work with other leading automation brands to provide comprehensive solutions. Our partnerships allow us to offer high-quality products with manufacturer warranties and support."
  },
  {
    question: "What are your business hours?",
    answer: "Our business hours are Monday to Saturday from 9:30 AM to 6:30 PM. For urgent inquiries, you can call us directly at our contact numbers which are available 24/7."
  }
];

// Company information
const companyInfo = {
  name: "NovaGen Automation",
  established: "2003",
  location: "Ludhiana, Punjab, India",
  description: "NovaGen Automation is an authorized channel partner with M/s Danfoss Industries Pvt Ltd & M/s Siemens Ltd. We provide comprehensive automation solutions including AC drives, soft starters, harmonic filters, pressure transmitters, valves, refrigeration compressors, touch screen panels, PLC modules, analog input modules, servo motors and amplifiers.",
  contact: {
    phone: [
      "+91 98786-28680",
      "+91 70874-88699"
    ],
    email: [
      "office@novagenautomation.com",
      "info@novagenautomation.com"
    ],
    address: "Pot No. 56, Akal sahay Nagar, Mundian Kalan, Chandigarh Road, Ludhiana - 141015, Punjab, India"
  }
};

// Function to find relevant product information
export const findProductInfo = (query: string) => {
  const normalizedQuery = query.toLowerCase();
  
  // Search in product names and descriptions
  for (const category of productKnowledgeBase) {
    for (const product of category.products) {
      if (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.applications.some((app) => app.toLowerCase().includes(normalizedQuery))
      ) {
        return {
          category: category.category,
          product: product
        };
      }
    }
  }
  
  return null;
};

// Function to find FAQ answers
export const findFAQAnswer = (query: string) => {
  const normalizedQuery = query.toLowerCase();
  
  for (const faq of faqKnowledgeBase) {
    if (
      faq.question.toLowerCase().includes(normalizedQuery) ||
      faq.answer.toLowerCase().includes(normalizedQuery)
    ) {
      return faq;
    }
  }
  
  return null;
};

// Function to generate response based on query
export const generateResponse = (query: string) => {
  // Check for product information
  const productInfo = findProductInfo(query);
  if (productInfo) {
    return `**${productInfo.product.name}** (${productInfo.category})

${productInfo.product.description}

**Applications:** ${productInfo.product.applications.join(", ")}

**Key Benefits:** ${productInfo.product.benefits.join(", ")}`;
  }
  
  // Check for FAQ answers
  const faqAnswer = findFAQAnswer(query);
  if (faqAnswer) {
    return faqAnswer.answer;
  }
  
  // Default responses
  const greetings = [
    "hello",
    "hi",
    "hey",
    "greetings"
  ];
  
  const thanks = [
    "thank you",
    "thanks",
    "thank"
  ];
  
  if (greetings.some((g) => query.toLowerCase().includes(g))) {
    return `Hello! I'm the NovaGen Automation assistant. I can help you with information about our products, services, and company. What would you like to know?`;
  }
  
  if (thanks.some((t) => query.toLowerCase().includes(t))) {
    return `You're welcome! If you have any other questions, feel free to ask. You can also contact us directly at ${companyInfo.contact.phone[0]} or ${companyInfo.contact.phone[1]}.`;
  }
  
  // Contact information
  if (query.toLowerCase().includes("contact") || query.toLowerCase().includes("phone") || query.toLowerCase().includes("email")) {
    return `You can contact us at:

**Phone:** ${companyInfo.contact.phone.join(" or ")}
**Email:** ${companyInfo.contact.email.join(" or ")}
**Address:** ${companyInfo.contact.address}

Our business hours are Monday to Saturday from 9:30 AM to 6:30 PM.`;
  }
  
  // Company information
  if (query.toLowerCase().includes("about") || query.toLowerCase().includes("company")) {
    return `${companyInfo.description}

Established in ${companyInfo.established} in ${companyInfo.location}, we have been providing reliable automation solutions for over 20 years.`;
  }
  
  // Default response
  return `I don't have specific information about "${query}". However, I can help you with general questions about our products and services. You can also:

1. Browse our products at /products
2. Contact us directly at ${companyInfo.contact.phone[0]}
3. Visit our contact page at /contact
4. Request a quote at /quote

Is there something specific you'd like to know?`;
};

// Function to send query via email (simulated)
export const sendQueryToEmail = async (query: string) => {
  // In a real implementation, this would send an email to the company
  // For now, we'll just log it
  console.log(`Chatbot Query: ${query}`);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Query sent successfully"
      });
    }, 1000);
  });
};