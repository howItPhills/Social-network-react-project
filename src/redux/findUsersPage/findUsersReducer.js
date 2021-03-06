import { dalAPI } from "../../API/DalApi";
import { changeObjectInArray } from "../../assets/functions/mapObject";

const SET_TOTAL_USERS_COUNT = "findeUsers/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "findeUsers/SET_CURRENT_PAGE";
const FOLLOWING_IN_PROGRESS = "findeUsers/FOLLOWING_IN_PROGRESS";
const FOLLOW = "findeUsers/FOLLOW";
const UNFOLLOW = "findeUsers/UNFOLLOW";
const SET_USERS = "findeUsers/SET_USERS";

let inintialState = {
   users: [],
   pageSize: 9,
   totalUsersCount: 0,
   isFetching: false,
   followInProgress: [],
   portionSize: 10,
   currentPortionNumber: 1,
}

export const findUsersReducer = (state = inintialState, action) => {

   switch (action.type) {
      case FOLLOW: {
         return {
            ...state,
            users: changeObjectInArray(state.users, 'id', action.userId, { followed: true })
            // users: state.users.map(u => {
            //    if (u.id === action.userId) {
            //       return { ...u, followed: true }
            //    }
            //    return u;
            // })
         }
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: changeObjectInArray(state.users, 'id', action.userId, { followed: false })
         }
      }
      case SET_TOTAL_USERS_COUNT: {
         return {
            ...state,
            ...action.payload
         }
      }
      case SET_CURRENT_PAGE: {
         return {
            ...state,
            currentPage: action.payload
         }
      }
      case SET_USERS: {
         return {
            ...state,
            users: [...action.users]
         }
      }
      case FOLLOWING_IN_PROGRESS: {
         return {
            ...state,
            followInProgress: action.isFetching ? [...state.followInProgress, action.id] : state.followInProgress.filter(id => id !== action.id),
         }
      }
      default:
         return state;
   }
}

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page })
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, payload: { totalUsersCount } });
export const checkFollowInProgress = (isFetching, id) => ({ type: FOLLOWING_IN_PROGRESS, isFetching, id });


const getUsersHandler = async (pageNumber, pageSize, dispatch, isTotalCountNeeded = false) => {
   const data = await dalAPI.getUsers(pageNumber, pageSize);
   dispatch(setUsers(data.items));
   isTotalCountNeeded && dispatch(setTotalUsersCount(data.totalCount));
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
   getUsersHandler(currentPage, pageSize, dispatch, true);
}

export const onPageChanged = (currentPage, pageSize) => async (dispatch) => {
   getUsersHandler(currentPage, pageSize, dispatch);
}

const followUnfollowFlow = async (dispatch, id, dalMethod, actionCreator) => {
   dispatch(checkFollowInProgress(true, id))
   const data = await dalMethod(id)
   if (data.resultCode === 0) {
      dispatch(actionCreator(id))
   }
   dispatch(checkFollowInProgress(false, id))
}

export const unfollowing = (id) => async (dispatch) => {
   followUnfollowFlow(dispatch, id, dalAPI.unfollowUser.bind(dalAPI), unfollow)
}

export const following = (id) => async (dispatch) => {
   followUnfollowFlow(dispatch, id, dalAPI.followUser.bind(dalAPI), follow)
}