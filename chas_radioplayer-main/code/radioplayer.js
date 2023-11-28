// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'
fetch('http://api.sr.se/api/v2/channels?format=json&size=100')
.then(response => response.json())
.then(data => {
  const channelsDiv = document.getElementById('channels');

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
  // Loopa genom varje station i datan
  data.channels.forEach(channel => {
    const channelDiv = document.createElement('div');
    channelDiv.classList.add('channel');

    // Skapa element för stationens namn
    const nameElement = document.createElement('h2');
    nameElement.textContent = channel.name;
    channelDiv.appendChild(nameElement);

    // Skapa element för stationens bild
    if (channel.image) {
      const imageElement = document.createElement('img');
      imageElement.src = channel.image;
      imageElement.alt = channel.name + ' logo';
      channelDiv.appendChild(imageElement);
    }

    // Använd färgen som bakgrundsfärg för kanalen
    if (channel.color) {
      channelDiv.style.backgroundColor = channel.color;
    }

    // Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
    // <audio controls>
    //   <source src="" type="audio/mpeg" />
    // </audio>
    // Skapa <audio> tagg för att spela ljudströmmen
    if (channel.liveaudio.url) {
      const audioElement = document.createElement('audio');
      audioElement.controls = true; 

      const sourceElement = document.createElement('source');
      sourceElement.src = channel.liveaudio.url;
      sourceElement.type = 'audio/mpeg';

      audioElement.appendChild(sourceElement);
      channelDiv.appendChild(audioElement);
    }

    channelsDiv.appendChild(channelDiv);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});

