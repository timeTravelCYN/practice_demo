import axios from 'axios'

// api 路径
const HOST = 'https://cnodejs.org/api/v1'

export function fetch(url, method='GET') {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: HOST + url,
    })
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default {

  /**
   * 用户登录
   * @param {any} accesstoken
   * @returns
   */
  Login (accesstoken) {
    return fetch(`/accesstoken?accesstoken=${accesstoken}`, 'post')
  },

  /**
   * 获取文章列表
   * @param {any} params
   * @returns
   */
   TopicsList (params) {
     return fetch(`/topics/${params}`)
   },

   /**
    * 获取文章详情
    * @param {any} id 参数为id
    */

   TopicsDetail (id) {
     return fetch(`/topic/${id}`)
   },

   /**
    * 获取用户信息
    * @param name 用户名
    * @returns
    */

   UserInfo (name) {
     return fetch(`/user/${name}`)
   },

   /**
    * 获取已读和未读消息
    * @param accesstoken
    * @returns
    */
   Messages (accesstoken) {
     return fetch(`/messages?mdrender=true&accesstoken=${accesstoken}`)
   },

   /**
    * 新建主题
    * @param form
    */

   Post (form) {
     return fetch(`/topics?${form}`, 'post')
   }

}
