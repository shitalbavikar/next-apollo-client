import React, {useRef, useEffect} from "react";
import uniqid from 'uniqid';
import { useQuery } from "@apollo/client";
import {Spinner} from "../Spinner/Spinner";
import styles from './Users.module.css';
import {UserCard} from './UserCard';
import {GET_USERS_INFO} from '../../lib/queries/getUsersInfo';


export const Users = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  const { loading, error, data, fetchMore } = useQuery(GET_USERS_INFO, {
    variables: { after: null }
  });
  
  useEffect(() => messageRef.current?.scrollIntoView({behavior: "smooth"}));

  const loadMoreUsersHandler = () => {
    const {endCursor} = data.users.pageInfo;
      
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
        fetchMoreResult.users.edges = [
          ...prevResult.users.edges,
          ...fetchMoreResult.users.edges
        ];
        return fetchMoreResult;
      }});
     
}

  if(error) return <div>Error</div>;

  if (loading) return <Spinner/>;
  
  if (data && data.users.edges.length > 0) {
      return (
        <React.Fragment>
          {/* <Suspense fallback={<Spinner />}> */}
              <div className={styles.usersWrapper}>
                  {data.users.edges.map((user: any) => { 
                  return <UserCard key={uniqid()} userInfo = {user.node}/> })}
              </div>
            {/* </Suspense> */}
          <div className={styles.userActions} ref={messageRef}>
            <button className= {styles.loadMoreButton} onClick={() => loadMoreUsersHandler()}> Load more..</button>
          </div>
        </React.Fragment>
      );
  }
} 