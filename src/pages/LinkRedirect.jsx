import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const redirectMap = {
  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",
  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",
  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",
  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",

  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",

  "qatarairways.com": "https://abc.steptosale.com/click?campaign_id=6361&pub_id=469",


  


  // Add more slugs here
};

const LinkRedirect = () => {
  const { slug } = useParams();

  useEffect(() => {
    const targetUrl = redirectMap[slug];
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      // fallback if slug not found
      window.location.href = "/";
    }
  }, [slug]);

  return 
};

export default LinkRedirect;

