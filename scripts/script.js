$(document).ready(function() {
    console.log("jq ready");
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
  $('.countryDisplay').append(
    '<div><p>' + country.code + '</p><p>' + country.name + '</p>'
  );
}
