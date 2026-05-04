export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Chicken' | 'Sides' | 'Beverages';
  price: number;
  description: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Classic Crunch Burger',
    category: 'Burgers',
    price: 8.99,
    description: 'Our signature beef patty, crisp lettuce, tomato, onions, pickles, and secret crunch sauce on a sesame bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  },
  {
    id: 'm2',
    name: 'Double Decker Beast',
    category: 'Burgers',
    price: 12.99,
    description: 'Two flame-grilled beef patties, double cheddar, bacon, caramelized onions, and BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1594212693891-38cb47228a05?w=500&q=80',
  },
  {
    id: 'm3',
    name: 'Spicy Chicken Sandwich',
    category: 'Chicken',
    price: 7.49,
    description: 'Crispy fried chicken breast dusted with ghost pepper spice, mayo, and pickles on a brioche bun.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80',
  },
  {
    id: 'm4',
    name: 'Chicken Tenders (5 pc)',
    category: 'Chicken',
    price: 6.99,
    description: 'Five pieces of golden, crispy chicken tenders served with your choice of dipping sauce.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80',
  },
  {
    id: 'm5',
    name: 'Loaded Crunch Fries',
    category: 'Sides',
    price: 5.49,
    description: 'Golden fries smothered in melted cheese, bacon bits, jalapeños, and ranch dressing.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&q=80',
  },
  {
    id: 'm6',
    name: 'Onion Rings',
    category: 'Sides',
    price: 3.99,
    description: 'Thick-cut onion rings battered and fried to crispy perfection.',
    image: 'https://images.unsplash.com/photo-1639024471210-62024bc0285a?w=500&q=80',
  },
  {
    id: 'm7',
    name: 'Classic Cola',
    category: 'Beverages',
    price: 1.99,
    description: 'Refreshing ice-cold cola.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80',
  },
  {
    id: 'm8',
    name: 'Vanilla Bean Shake',
    category: 'Beverages',
    price: 4.49,
    description: 'Thick and creamy milkshake made with real vanilla bean ice cream and topped with whipped cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80',
  },
];
