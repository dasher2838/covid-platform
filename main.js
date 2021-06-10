const countries = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude,
        lon = position.coords.longitude;
      const maps = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      fetch(maps)
        .then((response) => response.json())
        .then((data) => {
          let countryName = data.countryName;
          document.getElementById(
            "head"
          ).innerHTML = `COVID-19 Statistics in ${countryName}`;
          document.getElementById("defaulte").innerHTML = `${countryName}`;
          const link = "https://api.covid19api.com/summary";
          const defaultHA = `https://api.covid19api.com/total/dayone/country/${countryName}`;
          fetch(link)
            .then((response) => response.json())
            .then((data) => {
              for (let x of data.Countries) {
                let node = document.createElement("option");
                (node.innerHTML = x.Country), (node.value = x.Country);
                HTMLlist.appendChild(node);
              }
            });
          fetch(defaultHA)
            .then((response) => response.json())
            .then((data) => {
              totalcase.innerHTML = data[data.length - 1].Confirmed;
              dailycase.innerHTML =
                data[data.length - 1].Confirmed -
                data[data.length - 2].Confirmed;
              totalrecov.innerHTML = data[data.length - 1].Recovered;
              totaldeath.innerHTML = data[data.length - 1].Deaths;
              console.log(data[data.length - 1].Deaths);
              let y =
                (data[data.length - 1].Deaths /
                  data[data.length - 1].Recovered) *
                100;
              let z = y.toFixed(2);
              mortality.innerHTML = `${z}%`;
            });
        });
    });
  }
};
let HTMLlist = document.querySelector("#list");
let totalcase = document.querySelector("#totalcase");
let dailycase = document.querySelector("#dailycase");
let totalrecov = document.querySelector("#totalrecov");
let totaldeath = document.querySelector("#totaldeath");
let mortality = document.getElementById("mortality");

const defaultFunction = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude,
        lon = position.coords.longitude;
      const maps = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      fetch(maps)
        .then((response) => response.json())
        .then((data) => {
          let countryName = data.countryName;
          if (HTMLlist.value === `${countryName}`) {
            countries();
          } else {
            document.getElementById(
              "head"
            ).innerHTML = `COVID-19 Statistics in ${HTMLlist.value}`;
            const covidAPI = `https://api.covid19api.com/total/dayone/country/${HTMLlist.value}`;
            fetch(covidAPI)
              .then((response) => response.json())
              .then((data) => {
                totalcase.innerHTML = data[data.length - 1].Confirmed;
                dailycase.innerHTML =
                  data[data.length - 1].Confirmed -
                  data[data.length - 2].Confirmed;
                totalrecov.innerHTML = data[data.length - 1].Recovered;
                totaldeath.innerHTML = data[data.length - 1].Deaths;
                console.log(data[data.length - 1].Deaths);
                let y =
                  (data[data.length - 1].Deaths /
                    data[data.length - 1].Recovered) *
                  100;
                let z = y.toFixed(2);
                mortality.innerHTML = `${z}%`;
              });
          }
        });
    });
  }
};

window.addEventListener("load", () => {
  countries();
});
HTMLlist.addEventListener("change", defaultFunction);
