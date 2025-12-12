import React from 'react';



const Spinner = () => {
    return (
        <div className="flex items-center justify-center w-full h-40">
            <div className="w-12 h-12 border-4 border-noon-gray-200 border-t-noon-yellow rounded-full animate-spin"></div>
        </div>
    );
}

export default Spinner;