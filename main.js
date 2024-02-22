const album = document.getElementById("album");

const albumURL = "https://api.discogs.com/releases/28742893";

const discogsFetch = async () => {
  const response = await fetch(albumURL);
  const data = await response.json();
  console.log(data);
};
