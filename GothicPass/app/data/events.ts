export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number; // in SOL
  priceUSD: number;
  genre: string;
  description: string;
  imageUrl: string;
  available: number;
  total: number;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "gothic-night-1",
    title: "Noche Gótica: Sombras & Sonido",
    date: "April 14, 2026",
    time: "21:00",
    location: "The Underground, NYC",
    price: 0.05,
    priceUSD: 12.0,
    genre: "Gothic Rock",
    description:
      "Experience the darkest night of gothic rock featuring three legendary bands. Immerse yourself in haunting melodies and powerful performances in an intimate underground venue.",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
    available: 150,
    total: 300,
  },
  {
    id: "rap-battle-1",
    title: "Batalla de Rap Vol. 1",
    date: "April 21, 2026",
    time: "20:00",
    location: "Basement Club, CDMX",
    price: 0.1,
    priceUSD: 24.0,
    genre: "Hip-Hop / Rap",
    description:
      "La batalla de rap más intensa del año. Freestylers de toda América Latina se enfrentan en un escenario íntimo lleno de energía cruda y ritmo sin filtros.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    available: 180,
    total: 200,
  },
];

export const MOCK_TICKETS = [
  {
    id: "nft-ticket-71",
    tokenId: "NFT-TICKET-1-#1",
    event: MOCK_EVENTS[0],
    purchasedAt: "March 14, 2026",
  },
];
