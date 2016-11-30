$(document).ready(function() {
    console.log("jq ready");

    $('#countrySelect').on('change', function() {
      showSelectedCountryInfo();
    });

    $.ajax({
        url: "http://devjana.net/support/countries.json",
        dataType: 'JSON',
        success: function(data) {
          console.log(data);
          data.countries.forEach(function(country) {
            addCountryToSelect(country);
          });
        },
        statusCode: {
          404: function() {
            console.log("Could not reach url");
          }
        }
    });
});

function addCountryToSelect(country) {
  $('#countrySelect').append(
    '<option value="' + country.code + '">' + country.name + '</option>'
  );
}

function showSelectedCountryInfo() {
  var countryCode = $('#countrySelect').val();
  $.ajax({
    url: "https://restcountries.eu/rest/v1/alpha/" + countryCode,
    dataType: 'JSON',
    success: function(data) {
      console.log(data);
      displayCountryInfo(data);
    }
  });
}

function displayCountryInfo(country) {
  var htmlString = '<div class="country">';
  // Country title with name, native name, and population
  htmlString += '<h3>' + country.name + ', natively known as ' + country.nativeName;
  htmlString += ', has a population of ' + country.population + '</h3>';
  // List of additional info
  htmlString += '<ul><li>The capital of ' + country.name + ' is ' + country.capital + '</li>';
  htmlString += '<li>It has an area of ' + country.area + '</li>';
  htmlString += '<li>' + buildBorderString(country.borders) + '</li>';
  htmlString += '</ul>';

  $('#countryDisplay').html(htmlString);
}

function buildBorderString(borders) {
  var borderString = 'It is bordered by ';
  if (borders.length > 0) {
    borders.forEach(function(country) {
      console.log(country);
      borderString += country + ', ';
    });
    borderString = borderString.substring(0, borderString.length - 2);
    borderString += '.';
  } else {
    borderString = 'It has no bordering countries.';
  }
  return borderString;
}
