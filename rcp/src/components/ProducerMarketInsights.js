import React from "react";

import MarketInsights from "./MarketInsights";

export default function ProducerMarketInsights() {
  const producer = JSON.parse(localStorage.getItem("user"));
 
  return (
   <>
   <MarketInsights 
   agricultureUrl="producedProducts/allProducerAgricultureProductsByLocation" proteinUrl="producedProducts/allProducerProteinProductsByLocation"
   diaryUrl="producedProducts/allProducerDiaryProductsByLocation"
   currentUser={producer}
   />
   </>
     
  );
}
