const handleCORS = (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');  

  return true;
};

export default handleCORS;