import React from 'react'


const Artist = props => (
  <div>
    <h3>{props.artist.name}</h3>
    <p>{props.artist.description}</p>
    <p>{props.artist.date.substring(0,10)}</p>
  </div>
);


export default Artist;