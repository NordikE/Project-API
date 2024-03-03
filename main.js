// FETCH ALBUM DATA
const fetchAlbumData = async () => {
  try {
    const albumURL = "https://api.discogs.com/releases/28742893";
    const response = await fetch(albumURL);
    const data = await response.json();
    console.log("Fetched album data:", data);
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

  console.log("Band Name:", albumData.artists[0].name);
  console.log("Album Year:", albumData.year);
  console.log("Label:", albumData.labels[0].name);

  // BAND NAME IN HEADER
  document.getElementById("bandName").textContent = albumData.artists[0].name;

  // ALBUM ART
  const albumArt = document.getElementById("albumArt");
  const albumImage = document.createElement("img");
  albumImage.src = albumData.images[0].uri;
  albumArt.appendChild(albumImage);

  // ALBUM DETAILS
  const albumDetails = document.getElementById("albumDetails");

  // LABEL LINK
  const labelLinks = albumData.labels
    .map((label) => {
      const discogsURI = label.resource_url
        .replace("api.", "")
        .replace("/releases", "");
      return `<a href="${discogsURI}" target="_blank">${label.name}</a>`;
    })
    .join(", ");

  albumDetails.innerHTML = `
    <h2><strong>Album Name:</strong> <a href="${albumData.uri}" target="_blank">${albumData.title}</a></h2>
    <h3><strong>Year:</strong> ${albumData.year}</h3>
    <h3><strong>Label:</strong> ${labelLinks}</h3>
  `;

  // UPDATE TRACKLIST
  const tracklist = document.getElementById("tracklist");
  tracklist.innerHTML = "<h2>Tracklist</h2>";
  albumData.tracklist.forEach((track) => {
    tracklist.innerHTML += `<p><strong>${track.position}.</strong> ${track.title} <small>(${track.duration})</small></p>`;
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
}, 2000);
