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

// FETCH LABEL LINK
const fetchLabelLinks = async (albumData) => {
  try {
    const labelLinksData = fetch(albumData.labels[0].resource_url);
    const response = await labelLinksData;
    const data = await response.json();
    console.log("labelLink data: ", data);
    console.log("labelLink to use: ", data.uri);
    albumData.labelLink = data.uri;
  } catch (error) {
    console.error("ERROR FETCHING LABEL DATA:", error);
    albumData.labelLink = null;
  }
};

// DISPLAY ALBUM INFORMATION
const displayAlbumInfo = async () => {
  const albumData = await fetchAlbumData();
  if (!albumData) return;

  // SET BAND NAME IN FOOTER
  document.getElementById("bandName").textContent = albumData.artists[0].name;

  console.log("Band Name:", albumData.artists[0].name);
  console.log("Album Year:", albumData.year);
  console.log("Label:", albumData.labels[0].name);
  console.log("labelLink to use:", albumData.labelLink);

  // ALBUM ART
  const albumArt = document.getElementById("albumArt");
  const albumImage = document.createElement("img");
  albumImage.src = albumData.images[0].uri;
  albumArt.appendChild(albumImage);

  // LABEL LINKS
  await fetchLabelLinks(albumData);
  let labelLinks = "";
  if (albumData.labelLink) {
    labelLinks = `<a class="league-blue" href="${albumData.labelLink}" target="_blank">${albumData.labels[0].name}</a>`;
  }

  // ALBUM DETAILS
  const albumDetails = document.getElementById("albumDetails");
  albumDetails.innerHTML = `
    <h2 class="league-blue-lrg"><strong>Album Name:</strong> <a class="league-blue-lrg" href="${albumData.uri}" target="_blank">${albumData.title}</a></h2>
    <p><strong>Year:</strong> ${albumData.year}</p>
    <p><strong>Label:</strong> ${labelLinks}</p>
  `;

  // UPDATE TRACKLIST
  const tracklist = document.getElementById("tracklist");
  tracklist.innerHTML = "<h2>Tracklist</h2>";
  albumData.tracklist.forEach((track) => {
    tracklist.innerHTML += `<p class="league-blue-sml"><strong>${track.position}.</strong> ${track.title} <small>(${track.duration})</small></p>`;
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
