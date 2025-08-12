const ClockerInjector = () => {
    const location = useLocation();
  
    useEffect(() => {
      const path = location.pathname;
      const match = path.match(/^\/CouponsDetails\/(.+)/);
      if (match) {
        const slug = match[1]; // "Trip.com"
        const campaignMap = {
          "Trip.com": "tripcom123",
          "Amazon": "amz567",
          // Add more slug: campaignID pairs
        };
  
        const cid = campaignMap[slug];
        if (cid) {
          const script = document.createElement("script");
          script.src = `//steptosale.com/tk/?cid=${cid}`;
          script.async = true;
          document.body.appendChild(script);
  
          return () => {
            document.body.removeChild(script);
          };
        }
      }
    }, [location.pathname]);
  
    return null;
  };
  
