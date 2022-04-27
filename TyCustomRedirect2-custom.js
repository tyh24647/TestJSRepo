(() => {
  const NO_REDIRECT_PARAM_KEY = 'hyperweb-d-r';
  let lastUrl = location.href;

  const tryRedirect = () => {
    try {
      const url = new URL(location.href);
        
      if (url.indexOf('rentry.org') > -1) {
          
          history.replaceState({}, '', url.href);
          window.location.href = url.href;
      } else {
          if (url.indexOf('rentry.co')) {
            var newUrl = new URL('https://rentry.org/' + window.location.href);
						url = "https://rentry.org/" + newUrl.split('/', 2).lastChild().toString();
          }
      }
			
      url.searchParams.append(NO_REDIRECT_PARAM_KEY, '1');
      history.replaceState({}, '', url.href);
      window.location.href = url.href;
    } catch (e) {
        Console.log(e.toString());
        alert("Error: " + e.toString());
    }
  };

  const run = () => {
    const threshold = 150;
    const testImage = "http://www.google.com/images/phd/px.gif";
    const dummyImage = new Image();
    
    const testLatency = (cb) => {
      var tStart = new Date().getTime();
    
      dummyImage.src = testImage;
      dummyImage.onload = function() {
        var tEnd = new Date().getTime();
        cb(tEnd - tStart);
      };
    }

    try {
      const url = new URL(location.href);
      const host = url.hostname;
      const isTarget = [ 'rentry.co', 'www.rentry.co', 'm.rentry.co' ].some((h) => host.includes(h));
      const shouldRedirect = isTarget && 
            /*
            url.pathname.startsWith('/watch') && 
            
            TODO: Add filtering
            */      
   !url.searchParams.has(NO_REDIRECT_PARAM_KEY);

        /*
      if (shouldRedirect) {
        testLatency((avg) => {
          if (avg <= threshold) {
            tryRedirect();
          }
        });
      }
      */
        
        if (url.indexOf 'rentry.co' > -1) {
          testLatency((avg) => {
            if (avg <= threshold) {
              tryRedirect();
            }
          });
        } else if (shouldRedirect) {
            
            tryRedirect();
        } else {
            alert(url.hostname + ': \"' + url.toString()); 
        }
    } catch {}
  };

  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      run();
    }
  }).observe(document, { subtree: true, childList: true });

  run();
})();