import React from 'react';
import anime1 from './anime1.gif';


function Loading() {
  return (
    <div className="loading">
      <img alt='gif' src={anime1} className='LoaderGif'/>
    </div>
  );
}

export default Loading;
