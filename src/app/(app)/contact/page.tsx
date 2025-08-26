import Image from 'next/image';
import ContactForm from '../components/ContactForm';

// Types for API response
interface ContactInfo {
  brandName: string;
  phoneNumber: string;
  phoneNumberLink: string;
  email: string;
  emailLink: string;
  addressLine1: string;
  addressLine2: string;
  mapLink: string;
  laptopIcon?: {
    url: string;
  };
}

interface ContactFormSettings {
  submitButtonText: string;
  firstNameLabel: string;
  lastNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  messageLabel: string;
  requiredText: string;
}

interface ContactPageData {
  contactHeroTitle: string;
  contactHeroSubtitle: string;
  contactInfo: ContactInfo;
  contactFormSettings: ContactFormSettings;
  contactBannerImage?: {
    url: string;
  };
}

// Fallback data
const fallbackData: ContactPageData = {
  contactHeroTitle: 'Big ideas start with a simple hello.',
  contactHeroSubtitle: 'contact',
  contactInfo: {
    brandName: 'brandview',
    phoneNumber: '(+32) 471 46 07 08',
    phoneNumberLink: 'tel:+32471460708',
    email: 'collab@brandview.be',
    emailLink: 'mailto:collab@brandview.be',
    addressLine1: 'Brugse Heirweg 111',
    addressLine2: '8211 Aartrijke',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Brugse+Heirweg+111,+8211+Aartrijke',
  },
  contactFormSettings: {
    submitButtonText: 'send it off',
    firstNameLabel: 'first name',
    lastNameLabel: 'last name',
    phoneLabel: 'phone number',
    emailLabel: 'email',
    messageLabel: 'message',
    requiredText: '(required)',
  },
};

async function getContactPageData(): Promise<ContactPageData> {
  try {
    const base = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || '';
    if (!base) {
      return fallbackData;
    }
    const response = await fetch(`${base}/api/pages?where[and][0][slug][equals]=contact&where[and][1][pageType][equals]=contact`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch contact page data, using fallback');
      return fallbackData;
    }
    
    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }
    
    return fallbackData;
  } catch (error) {
    console.warn('Error fetching contact page data:', error);
    return fallbackData;
  }
}

const ContactPage = async () => {
    const pageData = await getContactPageData();
    
    return (
        <div>
            {/* Hero section */}
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium">{pageData.contactHeroTitle}</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">{pageData.contactHeroSubtitle}</p>
            </div>

            <div className="px-8 sm:px-16 py-10 bg-blue relative">
                <div className="flex flex-col lg:flex-row justify-between gap-16">
                    {/* Form Section */}
                    <div className="w-full">
                        <ContactForm formSettings={pageData.contactFormSettings} />
                    </div>

                    {/* Contact Information */}
                    <div className="text-lg md:text-[23px] pt-4 w-full lg:w-[300px]">
                        <h1 className="text-4xl md:text-5xl xl:text-6xl mb-4">{pageData.contactInfo.brandName}</h1>
                        
                        <div className="space-y-6 text-lg md:text-[23px]">
                            <div>
                                <h2 className="font-medium mb-2">phone number</h2>
                                <a href={pageData.contactInfo.phoneNumberLink} className="font-light relative w-fit group cursor-pointer block">
                                    {pageData.contactInfo.phoneNumber}
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div>
                                <h2 className="font-medium mb-2">email address</h2>
                                <a href={pageData.contactInfo.emailLink} className="font-light relative w-fit group cursor-pointer block">
                                    {pageData.contactInfo.email}
                                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div>
                                <h2 className="font-medium mb-2">address</h2>
                                <a 
                                    href={pageData.contactInfo.mapLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group cursor-pointer"
                                >
                                    <div className="relative w-fit">
                                        <p className="font-light">{pageData.contactInfo.addressLine1}</p>
                                        <p className="font-light">{pageData.contactInfo.addressLine2}</p>
                                        <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Laptop Illustration */}
                        <div className="hidden lg:block absolute bottom-20 w-32 md:w-42 lg:w-62">
                            {pageData.contactInfo.laptopIcon?.url ? (
                                <Image 
                                    src={pageData.contactInfo.laptopIcon.url} 
                                    alt="Laptop" 
                                    width={248} 
                                    height={200} 
                                    className="w-full h-auto" 
                                />
                            ) : (
                                <Image 
                                    src="/images/icons/laptop.svg" 
                                    alt="Laptop" 
                                    width={248} 
                                    height={200} 
                                    className="w-full h-auto" 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {pageData.contactBannerImage?.url ? (
                <Image 
                    src={pageData.contactBannerImage.url} 
                    alt="banner" 
                    width={1920} 
                    height={200} 
                    className="w-full h-52 md:h-auto object-cover" 
                />
            ) : (
                <Image 
                    src="/images/banner.svg" 
                    alt="banner" 
                    width={1920} 
                    height={200} 
                    className="w-full h-52 md:h-auto object-cover" 
                />
            )}
        </div>
    )
}

export default ContactPage;