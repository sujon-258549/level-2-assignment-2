export type TUserRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'guest';
  phoneNumber: string;
  isActive?: boolean;
  birthDate?: Date | string;
  profileImage?: string;
  isShop?: false;
  // Detailed Address (Localized for regions like BD/IN)
  address?: {
    street: string;
    street2?: string; // Apartment, suite, etc.
    city: string;
    state?: string; // Province/Division (e.g., "Dhaka Division")
    district: string; // জেলা (e.g., "Dhaka", "Chittagong")
    subdistrict?: string; // উপজেলা/Thana (e.g., "Savar", "Cox's Bazar Sadar")
    village?: string; // গ্রাম (e.g., "Mohammadpur")
    union?: string; // ইউনিয়ন (e.g., "Uttar Khan")
    postalCode: string; // পোস্ট কোড (e.g., "1340")
    country: string; // ISO code (e.g., "BD", "IN")
  };
};

export type TLoginUser = {
  email: string;
  password: string;
};
