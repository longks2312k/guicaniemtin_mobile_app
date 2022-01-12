import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../constants';

const instance = axios.create({
    baseURL: api.baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
});


// for get method
async function Get(url, param) {
    let token = await AsyncStorage.getItem('@storage_Key');
    if (!token) token = ''
    let header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    //console.log('api', url, token, header)
    return instance.get(url, { params: param, headers: header })
        .then((res) => {
            console.log('call api', res)
            if (res) {
                return res;
            }
            return null;

        })
        .catch((err) => {
            //console.log(err)
            return null
        });
}

// for Post method
async function Post(url, data, body) {
    let token = await AsyncStorage.getItem('@storage_Key');
    if (!token) token = ''
    //console.log('token', token)
    let header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    //console.log('api', url, token, header)
    return instance.post(url, data, { headers: header, body: JSON.stringify(body) })
        .then((res) => {
            //console.log('call api', res)
            if (res) {
                return res;
            }
            return null;

        })
        .catch((err) => {
            //console.log(err)
            return null
        });
}

async function Delete(url) {
    let token = await AsyncStorage.getItem('@storage_Key');
    if (!token) token = ''
    //console.log('token', token)
    let header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    //console.log('api', url, token, header)
    return instance.delete(url, { headers: header })
        .then((res) => {
            //console.log('del', res)
            if (res) {
                return res;
            }
            return null;
        })
        .catch((err) => {
            //console.log(err)
            return null
        });
}

async function Put(url, data, param) {
    let token = await AsyncStorage.getItem('@storage_Key');
    if (!token) token = ''
    console.log('token', token)
    let header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    console.log('api', url, token, header)
    return instance.put(url, data, { params: param, headers: header })
        .then((res) => {
            console.log('call api', res)
            if (res) {
                return res;
            }
            return null;
        })
        .catch((err) => {
            //console.log(err)
            return null
        });
}
export const getBossListApi = async (params) => {
    let url = api.BOSS_LIST_URL
    // url có thể dk truyền thêm tiền tố dạng url+ '?page=10&size=10'
    // size=10, page=1 url= URL + `?size=${size}&page=${page}`
    return Get(url, params)
}

export const postLoginApi = async (params) => {
    let url = api.LOGIN_URL
    return Post(url, params)
}

export const postPasswordRetrieval = async (params) => {
    let url = api.FORGOT_PASSWORD_URL
    return Post(url, params)
}

export const postRegisterApi = async (params) => {
    let url = api.REGISTER_URL
    return Post(url, params)
}

export const changeUserInfoApi = async (file, bio) => {
    let url = api.CHANGE_USER_INFO_URL
    let body = {file, bio};
    return Post(url, body)
}

export const getUnitsApi = async (params) => {
    let url = api.UNITS_URL
    return Get(url)
}

export const getActivitiesApi = async (params) => {
    let url = api.ACTIVITIES_NEWS_URL
    return Get(url)
}

export const getSharesApi = async (params) => {
    let url = api.SHARES_URL
    return Get(url, params)
}

export const postAddShareApi = async (params) => {
    let url = api.ADD_SHARES_URL
    return Post(url, params)
}

export const postAddTopicApi = async (params) => {
    let url = api.TOPICS_URL
    return Post(url, params)
}

export const getHomeSlideApi = async () => {
    let url = api.HOMEPAGE_SLIDE_URL
    return Get(url)
}

export const getGalleriesApi = async (params) => {
    let url = api.GALLERIES_URL
    return Get(url)
}

export const getGalleriesAllApi = async (params) => {
    let url = api.GALLERIES_ALL_URL
    return Get(url)
}

export const getGalleriesVideoApi = async (params) => {
    let url = api.GALLERIES_VIDEO_URL
    return Get(url)
}

export const getGalleriesVideoAllApi = async (params) => {
    let url = api.GALLERIES_VIDEO_ALL_URL
    return Get(url)
}

export const getHonorsApi = async (params) => {
    let url = api.HONORS_URL
    return Get(url)
}

export const getHomeHonorsApi = async () => {
    let url = api.HOME_HONORS_URL
    return Get(url)
}

export const getHistory = async (params) => {
    let url = api.HISTORY_TRADITIONAL_URL
    return Get(url)
}

export const getPlay = async (params) => {
    let url = api.PLAY_URL
    return Get(url)
}

export const getLook = async (params) => {
    let url = api.LOOK_URL
    return Get(url)
}

export const getDetailBlog = async (id) => {
    let url = api.BLOG_URL + id
    return Get(url, id)
}

export const getLeadListApi = async (params) => {
    let url = api.LEAD_LIST_URL
    return Get(url)
}

export const getNotificationApi = async (params) => {
    let url = api.NOTIFICATION_URL
    // url có thể dk truyền thêm tiền tố dạng url+ '?page=10&size=10'
    // size=10, page=1 url= URL + `?size=${size}&page=${page}`
    return Get(url, params)
}

export const deleteShare = async (id) /*page,size*/ => {
    let url = api.DELETE_EDIT_SHARES_URL + id;
    //'abc'+`${id}?page=${page}&size=${size}&search=${txt}`
    console.log("id", id);
    return Delete(url);
}

export const putEdit = async (id, params) => {
    let url = api.DELETE_EDIT_SHARES_URL + id
    return Put(url, id, params)
}

export const getTopicsApi = async (params) => {
    let url = api.TOPICS_URL
    return Get(url, params)
}

export const getTopicsFollowApi = async (params) => {
    let url = api.TOPICS_URL + '?type=follow'
    return Get(url)
}

export const getDetailTopicsApi = async (id) => {
    let url = api.TOPICS_URL + `/` + id
    return Get(url, id)
}

export const deleteTopic = async (id) /*page,size*/ => {
    let url = api.TOPICS_URL + `/` + id
    //'abc'+`${id}?page=${page}&size=${size}&search=${txt}`
    console.log("id", id);
    return Delete(url);
}

export const putEditTopic = async (id, params) => {
    let url = api.TOPICS_URL + `/` + id
    return Put(url, id, params)
}

export const postLike = async (params) => {
    let url = api.LIKE_URL
    return Post(url, params)
}

export const postFollow = async (params) => {
    let url = api.FOLLOW_URL
    return Post(url, params)
}

export const getContactsApi = async (params) => {
    let url = api.CONTACTS_URL
    return Get(url)
}
export const getComment = async (params) => {
    let url = api.COMMENT_URL
    return Get(url, params)
}

export const postComment = async (params) => {
    let url = api.COMMENT_URL
    return Post(url, params)
}

export const deleteComment = async (id) => {
    let url = api.COMMENT_URL + `/` + id
    console.log("id", id);
    return Delete(url);
}

export const putEditComment = async (id, params) => {
    let url = api.COMMENT_URL + `/` + id
    return Put(url, id, params);
}

export const getSearch = async (params) => {
    let url = api.SEARCH_URL
    return Get(url, params)
}

export const getCategoriesApi = async (params) => {
    let url = api.CATEGORIES_URL
    return Get(url, params)
}