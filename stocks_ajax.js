// API from Polygon.io to grab stock information

$(() => {

  const $tickerSymbol = 'AAPL'        // change to update based on form

  $.ajax({
    url: `https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/prev?adjusted=true&apiKey=8YnUMC5hVVc_wIHO6HAYQz177mt1rYDY`,
    method: "GET"
    
  }).then(
    (results) => {
      console.log(results)
    }
  )

})
