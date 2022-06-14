import React from "react";
import Wrapper from "../common/Wrapper/Wrapper";
import Banner from "../common/Banner/Banner";
import { CustomLink } from "../common/CustomLink";

function Home() {
    return (
        <>
            <Wrapper>
                <Banner title="Story Survey" subtitle="">
                    <CustomLink text={"Surveys"}  href="/surveys" style={"btnPrimary"}/>
                </Banner>
            </Wrapper>
            {/* <Services/>
            <FeaturedRooms/> */}
        </>
    )
}

export default Home;