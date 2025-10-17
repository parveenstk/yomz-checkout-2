export const gummyBagsSelector: GummyBagOption[] = [
    {
        id: 2,
        title: "51% OFF: 2 Bags",
        price: 39,
        shipping: "Incl. FREE",
        variant: {
            "ogGummies": { id: 6752 },
            "soursGummies": { id: 6764 }
        }
    },

    {
        id: 3,
        title: "60% OFF: 3 Bags",
        price: 32,
        shipping: "Incl. FREE",
        variant: {
            "ogGummies": { id: 6754 },
            "soursGummies": { id: 6766 }
        }
    },

    {
        id: 1,
        title: "40% OFF: 1 Bag",
        price: 48,
        shipping: "$7.99",
        variant: {
            "ogGummies": { id: 6750 },
            "soursGummies": { id: 6762 }
        }
    }
];

export const gymmyTypeData = [
    {
        id: 'ogGummies',
        img: '/images/og-bag.png',
        name: 'OG Gummies',
        alt: 'og-bag'
    },

    {
        id: 'soursGummies',
        img: '/images/sour-bag.png',
        name: 'Sour Gummies',
        alt: 'sours-bag'
    }
];

export const productData: ProductData[] = [
    {
        id: 1,
        img: {
            ogGummies: '/images/og-bag.png',
            soursGummies: '/images/sour-bag.png'
        },
        title: {
            ogGummies: 'OG Gummies',
            soursGummies: 'Sours Gummies'
        },
        bagQty: 2,
        compareAtPrice: 159.98,
        price: 78,
        percentageOff: 51

    },

    {
        id: 2,
        img: {
            ogGummies: '/images/og-bag.png',
            soursGummies: '/images/sour-bag.png'
        },
        title: {
            ogGummies: 'OG Gummies',
            soursGummies: 'Sours Gummies'
        },
        bagQty: 3,
        compareAtPrice: 239.97,
        price: 96,
        percentageOff: 60
    },

    {
        id: 3,
        img: {
            ogGummies: '/images/og-bag.png',
            soursGummies: '/images/sour-bag.png'
        },
        title: {
            ogGummies: 'OG Gummies',
            soursGummies: 'Sours Gummies'
        },
        bagQty: 1,
        compareAtPrice: 79.99,
        price: 48,
        percentageOff: 40
    },

    {
        id: 4, // Extra product
        img: {
            soursGummies: '/images/og-bag.png',
            ogGummies: '/images/sour-bag.png'
        },
        title: {
            soursGummies: 'OG Gummies - Extra',
            ogGummies: 'Sours Gummies - Extra'
        },
        bagQty: 1,
        compareAtPrice: 79.99,
        price: 48,
        percentageOff: 40
    }
];

export const slides = [
    '/images/slider3.jpg',
    '/images/slider1.jpg',
    '/images/slider4.jpg',
    '/images/slider2.jpg',
    '/images/slider5.jpg',
];

export const usStates = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" }
];

export const cardExpiryMonths = [
    { code: "01", name: "01 - January" },
    { code: "02", name: "02 - February" },
    { code: "03", name: "03 - March" },
    { code: "04", name: "04 - April" },
    { code: "05", name: "05 - May" },
    { code: "06", name: "06 - June" },
    { code: "07", name: "07 - July" },
    { code: "08", name: "08 - August" },
    { code: "09", name: "09 - September" },
    { code: "10", name: "10 - October" },
    { code: "11", name: "11 - November" },
    { code: "12", name: "12 - December" }
];

export const getValueMonth = (): string => {
    const month = new Date().getMonth() + 1; // 0-based, so +1
    return month.toString().padStart(2, '0'); // Ensure format is "01", "02", ...
};

export const getCardExpiryYears =
    (startYear = new Date().getFullYear(), numYears = 10): { value: string; name: string }[] =>
        Array.from({ length: numYears }, (_, i) => {
            const year = startYear + i;
            return { value: String(year), name: String(year) };
        });

export const compareAtPrice: { [key: string]: { price: number, discount: number } } = {
    "1 Bag": { price: 79.99, discount: 40 },
    "2 Bags": { price: 159.98, discount: 51 },
    "3 Bags": { price: 239.97, discount: 60 },
    "YOMZ Collectible Sticker": { price: 4.99, discount: 0 },
    "YOMZ Interactive E-book": { price: 9.99, discount: 0 },
    "YOMZ $20 Gift Card": { price: 20.00, discount: 0 },
    "Chance for Order Refund": { price: 239.97, discount: 0 },
    "Expedited Shipping": { price: 9.99, discount: 0 },
}
