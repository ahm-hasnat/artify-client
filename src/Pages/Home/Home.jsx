import React from 'react';
import Slider from '../../Components/Header/Slider';
import FeaturedArtifact from '../../Components/FeaturedArt/FeaturedArtifact';
import Exhibitions from '../../Components/Exhibition/Exhibitions';
import Visitors from '../../Components/Visitors/Visitors';
import { Helmet } from 'react-helmet-async';
import LatestAddition from '../../Components/LatestAddition/LatestAddition';

const Home = () => {
    return (
        <div>
             <Helmet>
                    <title>Artify - Home</title>
                  </Helmet>
            <Slider></Slider> 
             <FeaturedArtifact></FeaturedArtifact>
            <Exhibitions></Exhibitions>
            <LatestAddition></LatestAddition>
            <Visitors></Visitors>
        </div>
    );
};

export default Home;