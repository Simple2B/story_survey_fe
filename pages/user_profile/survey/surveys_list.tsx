import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ToggleSwitch from "../../../components/common/ToggleSwitchBtn/ToggleSwitchBtn";
import SurveyList from "../../../components/UserProfile/SurveyList/SurveyList";
import TableSurveyList from "../../../components/UserProfile/SurveyList/TableSurveyList";
import User from "../../../components/UserProfile/User";
import { IGetSurvey } from "../../../redux/types/surveyTypes";
import { IUserResponse } from "../../../redux/types/userTypes";
import { instancePagination } from "../../api/backend/pagination";
import { surveyApi } from "../../api/backend/surveyInstance";

// The number of items that are shown when the page opens (before scrolling and loading more)
const defaultQuantityItems = 24

const ProfileSurveyLists = () => {
  const {data: session, status} = useSession();
  const {push, asPath} = useRouter();
  const [checked, setChecked] = useState(false);

  const handleChangeChecked = () => {
    setChecked(!checked);
  };

  // TODO: create link for prod
  const link = 'https://survey.simple2b.net';
  const [isCopiedLink, setCopiedLink] = useState({
    isCopied: false,
    surveyUUID: "",
  });

  const [allServeyListLength, setAllServeyListLength] = useState(0);
  const [userSurveys, setUserSurveys] = useState<IUserResponse[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(defaultQuantityItems);
  const [endMessage, setEndMessage] = useState(true);

  const getListSurveysByUUID = async () => {
    const email: string= session.user.email;
    const response = await instancePagination(pageNumber).get(`/survey/${email}`);
    console.log(
      '%c [getListSurveys] RESPONSE data - ', 'color: black; background-color: green; font-weight: 700', response
      );

    setUserSurveys(response.data.data);
    setAllServeyListLength(response.data.data_length);
  };

  const getMoreCards = () => {
    if (userSurveys.length >= allServeyListLength && userSurveys.length > defaultQuantityItems) {
      setEndMessage(false);
    }

    setPageNumber((prev) => prev + 10);
  }

  if (isCopiedLink.isCopied) {
      setTimeout(() => {
          setCopiedLink({
              isCopied: false,
              surveyUUID: "",
          });
      }, 500);
  };

  const copyLink = (survey_id?: string, title?: string, isPublic?: boolean) => {
      console.log("COPY  survey id", survey_id);
      let value = `${link}/survey/${survey_id}`;
        if (!isCopiedLink) {
            value = `${link}/survey/not_public/${survey_id}`;
        }
      navigator.clipboard.writeText(value).then(() => {
        setCopiedLink({
          isCopied: true,
          surveyUUID: survey_id,
      });
    });
  };

  useEffect(() => {
    if (status === 'unauthenticated' && asPath.includes('/user_profile')) push("/");
    if (status === 'authenticated') {
      getListSurveysByUUID()
    }

  },[session, pageNumber]);

  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Survey List'}>
      <div className="surveyListContainer">
        <ToggleSwitch
          checked={ checked }
          onChange={ handleChangeChecked }
          id={"SurveyList"}
        />
        {
          !checked ?
          <InfiniteScroll
          dataLength={userSurveys.length}
          next={getMoreCards}
          hasMore={endMessage}
          loader={
            userSurveys.length > defaultQuantityItems
            ? <h3 className="paginationMessage"> Loading...</h3>
            : ''
          }
          endMessage={<h4 className="paginationMessage">Nothing more to show</h4>}
        >
            <SurveyList
              userSurveys={userSurveys}
              setUserSurveys={setUserSurveys}
              copyLink={copyLink}
              isCopiedLink={isCopiedLink}
              link={link}
              pageNumber={pageNumber}
            />
            </InfiniteScroll>
            :
            <InfiniteScroll
            dataLength={userSurveys.length}
            next={getMoreCards}
            hasMore={endMessage}
            loader={
              userSurveys.length > defaultQuantityItems
              ? <h3 className="paginationMessage"> Loading...</h3>
              : ''
            }
            endMessage={<h4 className="paginationMessage">Nothing more to show</h4>}
          >
            <TableSurveyList
              userSurveys={userSurveys}
              setUserSurveys={setUserSurveys}
              copyLink={copyLink}
              isCopiedLink={isCopiedLink}
              link={link}
              pageNumber={pageNumber}
            />
            </InfiniteScroll>
        }
      </div>
    </User>
  )
}

export default ProfileSurveyLists;
