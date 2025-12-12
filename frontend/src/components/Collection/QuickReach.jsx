import React from 'react';
import Image from '../Product/Image';


const QuickReach = ({ quickReach }) => {
  if (quickReach) return (
    <div className="bg-white py-6 my-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-[1440px] mx-auto px-4 lg:px-8">
              {quickReach.imgs.map(imgURL => (
                <div key={imgURL} className="aspect-square rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100">
                    <Image imgSrc={imgURL} className="w-full h-full object-cover" />
                </div>
              ))}
          </div>
      </div>
  )
}

export default QuickReach;