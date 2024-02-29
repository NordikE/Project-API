// FETCH ALBUM DATA

const fetchAlbumData = async () => {
  try {
    const albumURL = "https://api.discogs.com/releases/28742893";
    const response = await fetch(albumURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR FETCHING ALBUM DATA:", error);
    return null;
  }
};

// DISPLAY ALBUM INFORMATION

const displayAlbumInfo = async () => {
  const albumData = await fetchAlbumData();
  if (!albumData) return;

  // BAND NAME IN HEADER

  document.getElementById("bandName").textContent = albumData.artists[0].name;

  // ALBUM ART

  const albumArt = document.getElementById("albumArt");
  const albumImage = document.createElement("img");
  albumImage.src = albumData.images[0].uri;
  albumArt.appendChild(albumImage);

  // ALBUM DETAILS

  const albumDetails = document.getElementById("albumDetails");
  albumDetails.innerHTML = `
    <p><strong>Album Name:</strong> ${albumData.title}</p>
    <p><strong>Year:</strong> ${albumData.year}</p>
    <p><strong>Label:</strong> ${albumData.labels[0].name}</p>
  `;

  // UPDATE TRACKLIST

  const tracklist = document.getElementById("tracklist");
  tracklist.innerHTML = "<h2>Tracklist</h2>";
  albumData.tracklist.forEach((track) => {
    tracklist.innerHTML += `<p>${track.position}. ${track.title} (${track.duration})</p>`;
  });

  // SHOW CONTENT DIV

  const splashscreenDiv = document.getElementById("splashscreen");
  const contentDiv = document.getElementById("content");
  splashscreenDiv.style.display = "none";
  contentDiv.style.display = "block";
};

// CONTENT AFTER SPLASHSCREEN CLICK/ TIMEOUT

const showContent = () => {
  displayAlbumInfo();
};

// EVENT LISTENER FOR SPLASHSCREEN IMAGE

document.addEventListener("DOMContentLoaded", () => {
  const splashscreenImage = document.getElementById("splashscreen-image");
  splashscreenImage.addEventListener("click", showContent);
});

//  10 SECONDS TIMER
setTimeout(() => {
  showContent();
}, 10000);
