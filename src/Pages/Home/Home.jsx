import React from 'react';
import Slider from '../../Components/Header/Slider';
import FeaturedArtifact from '../../Components/FeaturedArt/FeaturedArtifact';
import Exhibitions from '../../Components/Exhibition/Exhibitions';
import Visitors from '../../Components/Visitors/Visitors';

const Home = () => {
    return (
        <div>
            <Slider></Slider> 
             <FeaturedArtifact></FeaturedArtifact>
            <Exhibitions></Exhibitions>
            <Visitors></Visitors>
        </div>
    );
};

export default Home;