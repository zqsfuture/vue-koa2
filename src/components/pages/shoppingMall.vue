<template>
  <div>
    <div class="search-bar">
      <van-col span="3">
        <img :src="locationIcon" width="80%" alt="" class="location-icon" />
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input" />
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </div>
    <!-- swiper area -->
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{ cate.mallCategoryName }}</span>
      </div>
    </div>
    <!-- adbanner -->
    <div>
      <img v-lazy="adBanner" alt="" width="100%" />
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recomend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" alt="" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ￥{{ item.price | moneyFilter }}(￥{{
                  item.mallPrice | moneyFilter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    ></floor-component>
    <floor-component
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    ></floor-component>
    <floor-component
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    ></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
                :goodsId="item.goodsId"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3,
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [], //热卖商品
      dataObj: {
        data: {
          advertesPicture: {
            PICTURE_ADDRESS:
              "http://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif",
          },
          floor3: [
            {
              goodsId: "ae4e71807a91460792670b657fa3ed3a",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407181423_15.jpg",
            },
            {
              goodsId: "2a398a5048074fc3b36bc8026bf9dc65",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407181216_8263.jpg",
            },
            {
              goodsId: "b37577ce45ee4cc6ba162959933dbac8",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407181247_7554.jpg",
            },
            {
              goodsId: "43912e1f7b7842cab40fcdee9dbe8758",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407181316_6196.jpg",
            },
            {
              goodsId: "98922617593e44c9a5880329a4cf0fd0",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407181348_4054.jpg",
            },
          ],
          floor2: [
            {
              goodsId: "d0fabe0c966043cb8313fa55de9c555b",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180547_3253.jpg",
            },
            {
              goodsId: "36360da2ec084316a100c2df1c714e37",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180631_4071.jpg",
            },
            {
              goodsId: "eb47b495b65d42b8a1fc5823dcd5589c",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180705_7181.jpg",
            },
            {
              goodsId: "7f6e857e83b240508836717c8764a0b0",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180736_2822.jpg",
            },
            {
              goodsId: "c7cb656294ea48d3b224ddee5fdd9647",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180408/20180408081756_7181.jpg",
            },
          ],
          floorName: {
            floor3: "营养奶品",
            floor2: "新鲜水果",
            floor1: "休闲食品",
          },
          floor1: [
            {
              goodsId: "e53c046465204d4fb8f22431cc2807e7",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180109_6316.jpg",
            },
            {
              goodsId: "f36f6dd8f62247d5846eaa9b3f269cbc",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg",
            },
            {
              goodsId: "72a3ec63956347a2a9f113589fe79c03",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180217_3970.jpg",
            },
            {
              goodsId: "a632bfb3818541da8e6843d6d0dbd917",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180257_2378.jpg",
            },
            {
              goodsId: "6694401a30a940f6ae437d541b7fd26d",
              image:
                "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180427_8557.jpg",
            },
          ],
          category: [
            {
              mallCategoryId: "1",
              mallCategoryName: "新鲜水果",
              bxMallSubDto: [
                {
                  mallSubId: "2c9f6c946016ea9b016016f79c8e0000",
                  mallCategoryId: "1",
                  mallSubName: "热带水果",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c94608ff843016095163b8c0177",
                  mallCategoryId: "1",
                  mallSubName: "时令水果",
                  comments: null,
                },
                {
                  mallSubId: "402880e86016d1b5016016db9b290001",
                  mallCategoryId: "1",
                  mallSubName: "苹果/梨",
                  comments: null,
                },
                {
                  mallSubId: "402880e86016d1b5016016dbff2f0002",
                  mallCategoryId: "1",
                  mallSubName: "柑橘橙柚",
                  comments: null,
                },
              ],
              comments: null,
              image:
                "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png",
            },
            {
              mallCategoryId: "2",
              mallCategoryName: "中外名酒",
              bxMallSubDto: [
                {
                  mallSubId: "2c9f6c9460337d540160337fefd60000",
                  mallCategoryId: "2",
                  mallSubName: "白酒",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e083f10010",
                  mallCategoryId: "2",
                  mallSubName: "啤酒",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016df1f92000c",
                  mallCategoryId: "2",
                  mallSubName: "葡萄酒",
                  comments: "",
                },
                {
                  mallSubId: "2c9f6c94621970a801626a40feac0178",
                  mallCategoryId: "2",
                  mallSubName: "洋酒",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c94621970a801626a412c240179",
                  mallCategoryId: "2",
                  mallSubName: "海外直采",
                  comments: null,
                },
              ],
              comments: null,
              image:
                "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408112010_4489.png",
            },
            {
              mallCategoryId: "3",
              mallCategoryName: "营养奶品",
              bxMallSubDto: [
                {
                  mallSubId: "402880e86016d1b5016016e135440011",
                  mallCategoryId: "3",
                  mallSubName: "鲜奶",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e171cc0012",
                  mallCategoryId: "3",
                  mallSubName: "酸奶",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e240e60013",
                  mallCategoryId: "3",
                  mallSubName: "乳酸菌",
                  comments: "",
                },
                {
                  mallSubId: "2c9f6c9460a03c0c0160a041ab1d0000",
                  mallCategoryId: "3",
                  mallSubName: "奶油奶酪",
                  comments: null,
                },
              ],
              comments: null,
              image:
                "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408113102_1595.png",
            },
            {
              mallCategoryId: "5",
              mallCategoryName: "食品饮料",
              bxMallSubDto: [
                {
                  mallSubId: "2c9f6c94609a62be0160a02d1dc20021",
                  mallCategoryId: "5",
                  mallSubName: "饼干糕点",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e4dca2001e",
                  mallCategoryId: "5",
                  mallSubName: "休闲小食",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e51380001f",
                  mallCategoryId: "5",
                  mallSubName: "糖果巧克力",
                  comments: "",
                },
                {
                  mallSubId: "2c9f6c94609a62be0160a02de70e0022",
                  mallCategoryId: "5",
                  mallSubName: "冲调饮品",
                  comments: "",
                },
                {
                  mallSubId: "2c9f6c94626a435f01626a4a7f590000",
                  mallCategoryId: "5",
                  mallSubName: "进口食品",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e4ac16001d",
                  mallCategoryId: "5",
                  mallSubName: "坚果炒货",
                  comments: null,
                },
                {
                  mallSubId: "402880e86016d1b5016016e549710020",
                  mallCategoryId: "5",
                  mallSubName: "饮用水",
                  comments: "",
                },
                {
                  mallSubId: "402880e86016d1b5016016e656c50022",
                  mallCategoryId: "5",
                  mallSubName: "果蔬汁",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c946016f86f01601709335d0000",
                  mallCategoryId: "5",
                  mallSubName: "乳制饮料",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c946077476a0160781eb392000d",
                  mallCategoryId: "5",
                  mallSubName: "咖啡茶饮",
                  comments: null,
                },
                {
                  mallSubId: "402880e86016d1b5016016e62bbd0021",
                  mallCategoryId: "5",
                  mallSubName: "碳酸饮料",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c946077476a0160781f6d8c000e",
                  mallCategoryId: "5",
                  mallSubName: "功能饮料",
                  comments: null,
                },
              ],
              comments: null,
              image:
                "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408113048_1276.png",
            },
            {
              mallCategoryId: "4",
              mallCategoryName: "个人护理",
              bxMallSubDto: [
                {
                  mallSubId: "2c9f6c94621970a801626a35cb4d0175",
                  mallCategoryId: "4",
                  mallSubName: "进口护理",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c94621970a801626a363e5a0176",
                  mallCategoryId: "4",
                  mallSubName: "口腔护理",
                  comments: null,
                },
                {
                  mallSubId: "2c9f6c94621970a801626a3770620177",
                  mallCategoryId: "4",
                  mallSubName: "特殊用纸",
                  comments: null,
                },
              ],
              comments: null,
              image:
                "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408112053_8191.png",
            },
          ],
          slides: [
            {
              image:
                "http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg",
              goodsId: "b1195296679f482aa7d54d95ac2b4a94",
            },
            {
              image:
                "http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg",
              goodsId: "da34d6f381464a219b37a9ac0ad579e8",
            },
            {
              image:
                "http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg",
              goodsId: "ad176e397858448a854dc50371334faf",
            },
          ],
          buyTime: "08:00:00-20:30:00",
          hotGoods: [
            {
              mallPrice: 3.9,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120500_6504.jpg",
              goodsId: "fb0f913950944b66a97ae262ad14609a",
              price: 3.9,
              name: "美汁源果粒奶优水果饮料蜜桃450ml/瓶",
            },
            {
              mallPrice: 4.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415115202_8432.jpg",
              goodsId: "775e575ce28a4f89b1dfe2c99eb08ae7",
              price: 4.5,
              name: "阿华田麦芽乳饮品牛奶味250mL/盒",
            },
            {
              mallPrice: 3.7,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415121351_6470.jpg",
              goodsId: "e68d5293c0a04e99a3480aaaad101362",
              price: 3.7,
              name: "养元香浓六个核桃240ml/瓶",
            },
            {
              mallPrice: 6.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120956_8491.jpg",
              goodsId: "7c377350cc9342edba600f3f6a548bd0",
              price: 6.5,
              name: "名屋木瓜牛乳340ml/瓶",
            },
            {
              mallPrice: 3.9,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120411_5740.jpg",
              goodsId: "f8c3f62810aa4ce781d14a885333a2b8",
              price: 3.9,
              name: "美汁源果粒奶优草莓味450ml/瓶",
            },
            {
              mallPrice: 7.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120720_7233.jpg",
              goodsId: "85d4fece907a4170b4b27a22c035321d",
              price: 7.5,
              name: "名屋醇豆浆饮料485ml/瓶",
            },
            {
              mallPrice: 5.0,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180103161335_9324.jpg",
              goodsId: "9abd33f0d2e4496f9c023a1dcfbfe2ad",
              price: 6.3,
              name: "李子园甜牛奶乳饮料450ml/瓶",
            },
            {
              mallPrice: 5.0,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120239_7917.jpg",
              goodsId: "1258c2fd52844f679fad1ebf24764082",
              price: 5.0,
              name: "李子园草莓风味乳饮料450ml/瓶",
            },
            {
              mallPrice: 6.3,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20171224082006_6602.jpg",
              goodsId: "bd25fd5d128e41fd9a737e99f75f92f8",
              price: 8.5,
              name: "娃哈哈AD钙奶220ml*4/条",
            },
            {
              mallPrice: 6.0,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415121537_4372.jpg",
              goodsId: "cfbe6ec3101a414f9563a8c6624aec08",
              price: 6.0,
              name: "一榨鲜绿豆汁300ml/瓶",
            },
            {
              mallPrice: 5.0,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120109_275.jpg",
              goodsId: "e9808eb0d3574c11971e38f75076f1a4",
              price: 5.0,
              name: "李子园朱古力风味乳饮料450ml/瓶",
            },
            {
              mallPrice: 7.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120857_4885.jpg",
              goodsId: "a5d1130de39f434facc6d35514cea053",
              price: 7.5,
              name: "名屋黑豆浆饮料485ml/瓶",
            },
            {
              mallPrice: 4.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415114959_7217.jpg",
              goodsId: "06130c91497b4806bf2b3e538814bb66",
              price: 4.5,
              name: "阿华田麦芽乳饮品高钙味250mL/盒",
            },
            {
              mallPrice: 6.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415121108_2001.jpg",
              goodsId: "b75e437adc0540c6b30516537d759122",
              price: 6.5,
              name: "名屋香蕉牛乳340ml/瓶",
            },
            {
              mallPrice: 3.9,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415120608_2319.jpg",
              goodsId: "0d51d2863bdc485688c2fee2a165bb51",
              price: 3.9,
              name: "美汁源果粒奶优原味450ml/瓶",
            },
            {
              mallPrice: 7.4,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20171224082144_8430.jpg",
              goodsId: "85173b3ce7a24a44ac2ed960a3e431fc",
              price: 9.0,
              name: "旺仔牛奶125ml*4/条",
            },
            {
              mallPrice: 68.0,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415122117_1031.jpg",
              goodsId: "99e37959ae22433da7bb378a2d24c19c",
              price: 68.0,
              name: "同福阿胶粥300g/箱",
            },
            {
              mallPrice: 3.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415122256_2373.jpg",
              goodsId: "068fe09cf2a849b4b8c7ce3fea734072",
              price: 3.5,
              name: "银鹭桂圆莲子八宝粥360g/瓶",
            },
            {
              mallPrice: 14.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415121432_880.jpg",
              goodsId: "8172961149434b51865612820c7b8891",
              price: 14.5,
              name: "椰树牌椰汁饮料1L/瓶",
            },
            {
              mallPrice: 4.5,
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180415115515_7254.jpg",
              goodsId: "a870459dfbba4df8af52e52aa6d0c426",
              price: 4.5,
              name: "豆本豆原味豆奶250ml/盒",
            },
          ],
          recommend: [
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180411083404_6619.jpg",
              mallPrice: 16.8,
              goodsId: "238bc2e023844769a6b67d9a4c04b2ea",
              price: 16.8,
              goodsName: "纳美小苏打源生护龈牙膏3010/支",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180411085355_2725.jpg",
              mallPrice: 9.5,
              goodsId: "245fc7d457e5454481db9620f0f9881f",
              price: 9.5,
              goodsName: "ABCK25超吸棉柔护垫22片/包",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180413093730_3138.jpg",
              mallPrice: 6.0,
              goodsId: "24afea564e5248b5a2bc59da95f09911",
              price: 6.0,
              goodsName: "果倍爽橙汁饮料330ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180409155457_3302.jpg",
              mallPrice: 109.0,
              goodsId: "418fc60784d04e71beffe1ce5174c947",
              price: 109.0,
              goodsName: "睿嫣白檀香护发素500ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180412173646_7050.jpg",
              mallPrice: 4.0,
              goodsId: "4ae4e2e2c1df45308be5011a97aae537",
              price: 4.0,
              goodsName: "乐百氏脉动芒果味600ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180413142444_1480.jpg",
              mallPrice: 6.9,
              goodsId: "4cf7744443f94557b7c6ad37dca9c4db",
              price: 6.9,
              goodsName: "农夫山泉NFC橙汁100%300ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180411084437_6209.jpg",
              mallPrice: 8.6,
              goodsId: "66074cd2d8464dcc9b2d7fbef5b417d9",
              price: 8.6,
              goodsName: "七度空间少女棉超薄超长夜用卫生巾8片/包",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180407172335_1082.jpg",
              mallPrice: 15.0,
              goodsId: "6694401a30a940f6ae437d541b7fd26d",
              price: 15.0,
              goodsName: "爱莲巧牛奶巧克力100g/块",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180407172544_4503.jpg",
              mallPrice: 9.9,
              goodsId: "a632bfb3818541da8e6843d6d0dbd917",
              price: 9.9,
              goodsName: "Gemez小鸡干脆面（烧烤鸡肉味）90g/袋",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180407173221_2015.jpg",
              mallPrice: 8.0,
              goodsId: "ad176e397858448a854dc50371334faf",
              price: 8.0,
              goodsName: "单身狗粮地中海盐味薯片 71g/袋",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180413091557_6636.jpg",
              mallPrice: 6.5,
              goodsId: "af117ed90b624318914fd4b42001216c",
              price: 6.5,
              goodsName: "可口可乐2L/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180413142955_5219.jpg",
              mallPrice: 6.9,
              goodsId: "bdd9bd7f131843c59c7f9aabdb36f069",
              price: 6.9,
              goodsName: "农夫山泉NFC苹果香蕉汁100%300ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180410091738_4529.jpg",
              mallPrice: 138.0,
              goodsId: "d6e15b84c1cd45138d9493c72333f7ce",
              price: 138.0,
              goodsName: "可米小子象牙松子罐装262g/罐",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180407171943_7260.jpg",
              mallPrice: 29.8,
              goodsId: "e53c046465204d4fb8f22431cc2807e7",
              price: 29.8,
              goodsName: "费罗伦珍珠水果糖（狮子座）240g/盒",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180412174207_1023.jpg",
              mallPrice: 4.0,
              goodsId: "e7ebc6153924459287468104768bee00",
              price: 4.0,
              goodsName: "农夫山泉水葡萄果味饮料530ml/瓶",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20180407171519_1489.jpg",
              mallPrice: 9.9,
              goodsId: "f36f6dd8f62247d5846eaa9b3f269cbc",
              price: 11.5,
              goodsName: "捷客每日红提味曲奇120g/盒",
            },
            {
              image:
                "http://images.baixingliangfan.cn/compressedPic/20171225110825_6758.jpg",
              mallPrice: 26.0,
              goodsId: "fa750a815cfd46c3ba468db800f0e370",
              price: 28.0,
              goodsName: "青芒1.6kg/盒",
            },
          ],
          sendFee: {
            chargeStartFee: "59.00",
            deliveryFee: "3.00",
          },
        },
        page: null,
        limit: null,
      },
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo,
  },
  mounted() {
    this.category = this.dataObj.data.category;
          this.adBanner = this.dataObj.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = this.dataObj.data.slides;
          this.recommendGoods = this.dataObj.data.recommend;
          this.floor1 = this.dataObj.data.floor1;
          this.floor2 = this.dataObj.data.floor2;
          this.floor3 = this.dataObj.data.floor3;
          this.floorName = this.dataObj.data.floorName;
          this.hotGoods = this.dataObj.data.hotGoods;
  //   axios({
  //     url: url.getShopingMallInfo,
  //     method: "get",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status == 200) {
  //         this.category = this.dataObj.data.category;
  //         this.adBanner = this.dataObj.data.advertesPicture.PICTURE_ADDRESS;
  //         this.bannerPicArray = this.dataObj.data.slides;
  //         this.recommendGoods = this.dataObj.data.recommend;
  //         this.floor1 = this.dataObj.data.floor1;
  //         this.floor2 = this.dataObj.data.floor2;
  //         this.floor3 = this.dataObj.data.floor3;
  //         this.floorName = this.dataObj.data.floorName;
  //         this.hotGoods = this.dataObj.data.hotGoods;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  },
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff;
  color: #fff;
  background-color: #e5017d;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swipe-area {
  clear: both;
  max-height: 9rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
