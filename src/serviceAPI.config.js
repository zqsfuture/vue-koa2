const BASEURL = "https://www.easy-mock.com/mock/5b7f6bf31ec0a8656a2a9008/smileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShopingMallInfo: BASEURL + "index",  //商城首页全部信息
  getGoodsInfo: BASEURL + "getGoodsInfo",
  registerUser: LOCALURL + 'user/register', //用户注册接口
  login: LOCALURL + 'user/login', //用户登陆接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //商品详细信息
  getCategoryList: LOCALURL + 'goods/getCategoryList', //商品大分类
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', //商品小分类
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', //商品小分类信息
}
module.exports = URL;
