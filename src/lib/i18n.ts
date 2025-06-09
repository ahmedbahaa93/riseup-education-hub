// Internationalization setup
export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [locale: string]: Translation;
}

const translations: Translations = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      courses: 'Courses',
      blog: 'Blog',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      country: 'Country',
      price: 'Price',
      currency: 'USD',
      total: 'Total',
      subtotal: 'Subtotal',
      tax: 'Tax',
      discount: 'Discount',
      cart: 'Cart',
      checkout: 'Checkout',
      payment: 'Payment',
      order: 'Order',
      invoice: 'Invoice',
      certificate: 'Certificate',
      course: 'Course',
      instructor: 'Instructor',
      student: 'Student',
      admin: 'Admin',
      category: 'Category',
      tag: 'Tag',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      level: 'Level',
      rating: 'Rating',
      reviews: 'Reviews',
      enrollment: 'Enrollment',
      progress: 'Progress',
      completed: 'Completed',
      pending: 'Pending',
      active: 'Active',
      inactive: 'Inactive',
      published: 'Published',
      draft: 'Draft',
      featured: 'Featured',
      popular: 'Popular',
      new: 'New',
      recommended: 'Recommended'
    },
    navigation: {
      home: 'Home',
      courses: 'Courses',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout'
    },
    hero: {
      title: 'Advance Your Career with Expert Training',
      subtitle: 'Join thousands of professionals who have transformed their careers with our comprehensive training programs and industry-recognized certifications.',
      cta: 'Explore Courses',
      consultation: 'Free Consultation'
    },
    courses: {
      title: 'Explore Our Courses',
      subtitle: 'Discover professional training courses designed to advance your career and skills.',
      searchPlaceholder: 'Search courses...',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      allCategories: 'All Categories',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      enrollNow: 'Enroll Now',
      learningObjectives: 'Learning Objectives',
      prerequisites: 'Prerequisites',
      instructor: 'Instructor',
      duration: 'Duration',
      level: 'Level',
      students: 'Students',
      rating: 'Rating',
      price: 'Price',
      originalPrice: 'Original Price',
      discount: 'Discount',
      featured: 'Featured',
      popular: 'Popular',
      new: 'New',
      relatedCourses: 'Related Courses'
    }
  }
  // Add more languages here (es, fr, de, etc.)
};

let currentLocale = 'en';

export const setLocale = (locale: string) => {
  if (translations[locale]) {
    currentLocale = locale;
    localStorage.setItem('locale', locale);
  }
};

export const getLocale = () => {
  const savedLocale = localStorage.getItem('locale');
  return savedLocale && translations[savedLocale] ? savedLocale : currentLocale;
};

export const t = (key: string, params?: Record<string, string>): string => {
  const keys = key.split('.');
  let value: any = translations[currentLocale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation key "${key}" not found for locale "${currentLocale}"`);
    return key;
  }
  
  if (params) {
    return Object.entries(params).reduce(
      (str, [paramKey, paramValue]) => str.replace(`{{${paramKey}}}`, paramValue),
      value
    );
  }
  
  return value;
};

// Initialize locale from localStorage
if (typeof window !== 'undefined') {
  const savedLocale = getLocale();
  setLocale(savedLocale);
}