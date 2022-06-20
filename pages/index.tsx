import React from "react";
import Home from "../components/Home/Home";
import MainContainer from "../components/Containers/MainContainer/MainContainer";

const Index = () => {
  return (
    <MainContainer title={'Home'} keywords={""} style={""}>
      <Home/>
    </MainContainer>
  )
}

export default Index;
