import React from "react";
import Home from "../components/Home/Home";
import MainContainer from "../components/Containers/MainContainer/MainContainer";
import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();
  return (
    <MainContainer title={'Home'} keywords={""} style={""}>
      <Home/>
    </MainContainer>
  )
}

export default Index;