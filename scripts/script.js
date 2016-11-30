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
            displayCountry(country);
          });
        },
        statusCode: {
          404: function() {
            console.log("Could not reach url");
          }
        }
    });
});

function displayCountry(country) {
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
    }
  });
}
