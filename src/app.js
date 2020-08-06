const fetch = require("node-fetch");

console.log("Saavn Radio");

function getdata() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://www.jiosaavn.com/api.php?__call=webradio.getSong&stationid=L2PPP5Ax4fenhvi7MatDTLSBzBzz4MbfNfAXnI-7-i9yym1L,fpXfQ__&api_version=4&_format=json&_marker=0&ctx=web6dot0"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(
          json.song.more_info.encrypted_media_url
            .replace("/", "%2F")
            .replace("+", "%2B")
        );
        return json.song.more_info.encrypted_media_url
          .replace("/", "%2F")
          .replace("+", "%2B");
      })
      .then((song) => {
        // const songId = song.toString().replace('/', '%2F');
        console.log(song);
        fetch(
          ` https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=${song}&bitrate=192&api_version=4&_format=json&ctx=web6dot0&_marker=0`
        )
          .then((res) => res.json())
          .then((json) => {
            resolve(json);
          });
      });
  });
}

let song = "";
getdata().then((data) => {
  console.log("DATA IS " + JSON.stringify(data));
  song = data;
});
