const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://oxadczqwnuxlugfuqklf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YWRjenF3bnV4bHVnZnVxa2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODA5MDYsImV4cCI6MjA5Mzc1NjkwNn0._C-Li7AJoDVla6AG1iEp1rKjAAxFffMh-QNZFfrYkPY'
);

async function registerOffers() {
  const offers = [
    {
      id: 'offer-1',
      name: 'Double Crunch BOGOF',
      price: 12.99,
      description: 'Buy one Double Decker Beast and get the second one absolutely free!',
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
    },
    {
      id: 'offer-2',
      name: 'Family Feast XL',
      price: 49.99,
      description: '2 Signature Burgers, 2 Spicy Chicken Sandwiches, 4 Fries, and 4 Drinks.',
      category: 'Sides',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80'
    }
  ];

  const { data, error } = await supabase.from('products').upsert(offers);
  if (error) console.error('Error registering offers:', error);
  else console.log('Offers registered successfully!');
}

registerOffers();
