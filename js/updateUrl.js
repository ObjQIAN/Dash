function updateUrl(events) {
    events.addEventListener('plotChange', function(event) {
      const countryToPlot = event.detail.countryToPlot.join(','); // Assuming countryToPlot is an array
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('country', countryToPlot);
      window.history.pushState({}, '', newUrl);
    });
  
    events.addEventListener('plotStop', function(event) {
      const countryToPlot = event.detail.countryToPlot.join(','); // Assuming countryToPlot is an array
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('country', countryToPlot);
      window.history.pushState({}, '', newUrl);
    });
}

export {
    updateUrl,
  };
  



  /*
  function initializeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const countryToPlot = params.get('country');
    if (countryToPlot) {
      // Split the countryToPlot string into an array and handle it
      const countries = countryToPlot.split(',');
      // Now trigger the necessary actions with this countries array
      // For example, you might want to update the UI or trigger other functions
    }
  }
  
  // When the page loads
  initializeFromUrl();
  */
  // Assuming you have an `events` object for your event listeners





/*function updateUrl(events) {
    var originalUrl = window.location.href;
    //const queryString = window.location.search;
    events.addEventListener('plotChange', function(event) {
        const countryToPlot = event.detail.countryToPlot;
        //console.log(countryToPlot);
        const newUrl = originalUrl + "?country=" + countryToPlot;
        
        // Process countryToPlot
      });
    
      events.addEventListener('plotStop', function(event) {
        const countryToPlot = event.detail.countryToPlot;
        //console.log(countryToPlot);
        const newUrl = originalUrl + "?country=" + countryToPlot;
        // Process countryToPlot
      });
}*/