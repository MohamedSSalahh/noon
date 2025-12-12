import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocationAddress } from '../../redux/slices/locationSlice';
import Spinner from '../Spinner/Spinner';
import { lazy } from 'react';

const GoogleMap = lazy(async () =>  {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(
    () => import("./GoogleMap")
  );
});

const Map = ({ isShown, hideMap }) => {

  const lat = useSelector(({ locationState }) => locationState.lat);
  const lng = useSelector(({ locationState }) => locationState.lng);
  const addressChanged = useSelector(({ locationState }) => locationState.addressChanged);
  const dispatch = useDispatch();
 
  const getReverseGeocodingData = async () => {
    const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/Geocodeserver/reverseGeocode?f=pjson&featureTypes=&location=${lat + 1.172822},${lng - 1.185721}`);
    const data = await response.json();
    dispatch(updateLocationAddress(data.address.Match_addr));
  }
  
  const confirmLocation = () => {
    getReverseGeocodingData();
    hideMap();
  }

  if (isShown) return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-sm flex items-center justify-center transition-opacity duration-300" onClick={hideMap}>
      <div 
        className="w-[90vw] md:w-[600px] h-[80vh] md:h-[600px] bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-lg text-noon-black">Add New Address</h3>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-red-500"
            onClick={hideMap}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gray-100">
            <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                    <Spinner />
                </div>
            }>
                <GoogleMap isMarkerShown />
            </Suspense>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-white">
          <button 
            className="w-full py-4 rounded-lg text-base font-bold text-white bg-noon-blue hover:bg-noon-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
            onClick={confirmLocation} 
            disabled={!addressChanged}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("map")
  )
}

export default Map;