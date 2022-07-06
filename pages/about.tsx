import React from "react";
import Banner from "../components/common/Banner/Banner";
import Wrapper from "../components/common/Wrapper/Wrapper";
import MainContainer from "../components/Containers/MainContainer/MainContainer";

const About = () => {
  return  (
    <MainContainer title={"About"} keywords={""} style={""}>
      <Wrapper>
        <Banner title={"Story Survey"} subtitle={"create your survey"}>
          {}
        </Banner>
      </Wrapper>
    </MainContainer>
  );
};

export default About;
