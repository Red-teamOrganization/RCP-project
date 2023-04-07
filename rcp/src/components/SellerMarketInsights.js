import React from "react";

import MarketInsights from "./MarketInsights";

export default function SellerMarketInsights() {
  const seller = JSON.parse(localStorage.getItem("user"));
 
  return (
   <>
   <MarketInsights 
   agricultureUrl="soldProducts/allSellerAgricultureProductsByLocation" 
   proteinUrl="soldProducts/allSellerProteinProductsByLocation"
   diaryUrl="soldProducts/allSellerDiaryProductsByLocation"
   currentUser={seller}
   />
   </>
     
  );
}