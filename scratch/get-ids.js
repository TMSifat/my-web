const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://oxadczqwnuxlugfuqklf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YWRjenF3bnV4bHVnZnVxa2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODA5MDYsImV4cCI6MjA5Mzc1NjkwNn0._C-Li7AJoDVla6AG1iEp1rKjAAxFffMh-QNZFfrYkPY'
);

async function getIds() {
  const { data, error } = await supabase.from('products').select('id, name').limit(5);
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

getIds();
