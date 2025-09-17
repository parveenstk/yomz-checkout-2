export const gummyBagsSelector = [
    {
        id: 1,
        title: "51% OFF: 2 Bags",
        price: 39,
        shipping: "Incl. FREE Shipping"
    },

    {
        id: 2,
        title: "60% OFF: 3 Bags",
        price: 32,
        shipping: "Incl. FREE Shipping"
    },

    {
        id: 3,
        title: "40% OFF: 1 Bag",
        price: 48,
        shipping: "$7.99 Shipping"
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
    }
];