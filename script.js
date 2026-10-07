let countryInput = document.getElementById("countryInput");
let searchBtn = document.getElementById("searchBtn");
let countryResult = document.getElementById("countryResult");
countryInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", function () {
  let countryName = countryInput.value.trim();
  if (countryName === "") {
    countryResult.innerHTML = `<h2 class='content'>Please enter a country's name!</h2>`;
    return;
  }
  countryResult.innerHTML = "<h2 class='content'>Loading...</h2>";
  fetch(`https://countries.dev/name/${countryName}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Country not found!");
      }
      return response.json();
    })
    .then(function (data) {
      countryResult.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        let card = `
        <div class="countryCard">`;
        card += `<img src='${data[i].flags.png}' alt='${data[i].name} flag'>`;
        card += `
        <h1>${data[i].name}</h1>
        <p><strong>Region :</strong> ${data[i].region}</p>
        `;
        if (!data[i].capital) {
          card += `

        <p><strong>Capital :</strong> Not available</p>
      `;
        } else {
          card += `<p><strong>Capital :</strong> ${data[i].capital}</p>`;
        }

        card += `
        <p><strong>Subregion :</strong> ${data[i].subregion}</p>
        `;
        if (data[i].languages) {
          let languages = data[i].languages
            .map(function (language) {
              return language.name;
            })
            .join(", ");

          card += `<p><strong>Language/s :</strong> ${languages}</p>`;
        }
        card += `<p><strong>Population :</strong> ${data[i].population.toLocaleString()}</p>`;
        if (data[i].currencies) {
          let currencies = data[i].currencies
            .map(function (currency) {
              return currency.name;
            })
            .join(", ");

          card += `<p><strong>Currency/s :</strong> ${currencies}</p>`;
        }
        card += `</div>`;
        countryResult.innerHTML += card;
      }
    })
    .catch(function (error) {
      countryResult.innerHTML = `<h2 class="content">${error.message}</h2>`;
    });
});
