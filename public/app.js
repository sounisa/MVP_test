const button = document.getElementById('post-btn');

button.addEventListener('click', async _ => {
  try {     
    const response = await fetch('/pokemons', {
      method: 'post',
      body: {
        // Your body
      }
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});

async function getData() {
	const response = await fetch('/pokemons')
  const data = await response.json() 
  console.log(data)
}

getData()