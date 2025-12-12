import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetAddressChanged } from "../../redux/slices/locationSlice";
import Map from "./Map";

const LeftHeader = () => {
    const [mapIsShown, setMapIsShown] = useState(false);
    const currentLocation = useSelector(({ locationState }) => locationState.address);
    const addressChanged = useSelector(({ locationState }) => locationState.addressChanged);
    const dispatch = useDispatch();

    const showMap = () => {
        setMapIsShown(true);
    }

    const hideMap = () => {
        setMapIsShown(false);
        if (addressChanged) dispatch(resetAddressChanged());
    }

    return (
        <>
            <div className="flex items-center shrink-0 gap-6">
                <Link to="/" className="flex-shrink-0">
                    <img className="w-24 h-auto block" src="/data/assets/svg/noon-logo-en.svg" alt="noon" />
                </Link>
                <div className="hidden lg:flex items-center cursor-pointer hover:bg-black/5 p-2 rounded-lg transition-colors duration-200"
                     onClick={showMap}
                >
                    <div className="mr-3">
                        <img className="w-6 h-6 rounded-full shadow-sm" src="/data/assets/svg/eg.svg" alt="Egypt" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-noon-gray-800 font-medium whitespace-nowrap">Deliver to</span>
                            <i className="fa-solid fa-chevron-down text-[10px] text-noon-gray-500"></i>
                        </div>
                        <div 
                            className="text-sm font-bold text-noon-black w-[140px] truncate leading-tight"
                            title={currentLocation || 'Select Location'}
                        >
                            {currentLocation || 'Select Location'}
                        </div>
                    </div>
                </div>
            </div>
            <Map isShown={mapIsShown} hideMap={hideMap} />
        </>
    );
};

export default LeftHeader;
