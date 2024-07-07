import convertToEmoji from "../utils/emoji-convertor";

 /**
  * A reducer which handle the following list of actions types
  * - geoPositionLoading -> Enable loading and set geoPositionError to null
  * - geoPositionError   -> handles the error fetching geoPosition
  * - cityCreation       -> updates the city component with a new city obj
  */
 export default function formReducer(state, action) {
    switch (action.type) {
        case "geoPositionLoading":
            return {
                ...state,
                isLoadingGeoPosition: true,
                geoPositionError: "",
            }

        case "geoPositionError":
            return {
                ...state,
                isLoadingGeoPosition: false,
                geoPositionError: action.payLoad
            }
        case "cityCreation":
                 return {
                ...state,
                isLoadingGeoPosition: false,
                cityName: (action.payLoad.city || action.payLoad.locality || ""),
                country: action.payLoad.country,
                emoji: convertToEmoji(action.payLoad.countryCode)
            };
            default:
                throw new Error("Unknown Action!!");
    }
   
}