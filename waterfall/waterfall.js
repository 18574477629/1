let page = 1;
const query = wx.createSelectorQuery()
Page({
    data: {
        images: [], //瀑布流图片
        Arr1: [], //左列
        total_page: null,
        Arr2: [], //右列
        img_data: null,
        page: 1,
        wid_l_length: 0,
        wid_r_length: 0
    },

    img_load_l(e) {
        let wid_l_length = e.detail.width + this.data.wid_l_length
        this.setData({
            wid_l_length
        })
    },

    img_load_r(e) {
        let wid_r_length = e.detail.width + this.data.wid_r_length
        this.setData({
            wid_r_length
        })
    },
    onReachBottom() {
        let total_page = this.data.total_page
        let page = ++this.data.page
        if (page <= total_page) {
            this.onLoad(page)
        } else {}
    },
    //页面加载执行
    onLoad: function (page) {
        let total_page = page
        if (typeof total_page != 'object') {
            let This = this;
            let data = {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuY2xvdWRpbmxpbmsuY29tIiwiYXVkIjoiY2xvdWRpbmxpbmtfd3hhcHAiLCJpYXQiOjE1ODc0NTg1MjksImV4cCI6MTU5MDA1MDUyOSwidWlkIjoiMSIsInJpZCI6IjEiLCJwaG9uZSI6bnVsbH0.KLCDHkXvPVPCk-zQlx_4BIU_5_vwLkexMTkTi2AexVA',
                user_id: 22,
                role_id: 1,
                lat: 28.23529,
                lng: 112.93134,
                cur_size: 7,
                cur_page: total_page
                // lat: 0,
                // lng: 0,
                // cur_size: 10
            }
            // debugger
            wx.request({
                url: `http://wxapptest.cloudinlink.com/Info/v1/homePageDiscover?token=${data.token}&cur_page=${data.cur_page}&user_id=${data.user_id}&role_id=${data.role_id}&lat=${data.lat}&lng=${data.lng}&cur_size=${data.cur_size}`,
                success: function (res) {
                    let img_data = res.data.data.res_info
                    let img_datas = This.data.img_data
                    img_datas.push(img_data)
                    let new_img_data = img_datas.flat()
                    This.setData({
                        img_data: new_img_data
                    })
                    debugger
                    This.loadImages(new_img_data);
                }
            })
        }
        let This = this;
        let data = {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuY2xvdWRpbmxpbmsuY29tIiwiYXVkIjoiY2xvdWRpbmxpbmtfd3hhcHAiLCJpYXQiOjE1ODc0NTg1MjksImV4cCI6MTU5MDA1MDUyOSwidWlkIjoiMSIsInJpZCI6IjEiLCJwaG9uZSI6bnVsbH0.KLCDHkXvPVPCk-zQlx_4BIU_5_vwLkexMTkTi2AexVA',
            user_id: 22,
            role_id: 1,
            lat: 28.23529,
            lng: 112.93134,
            cur_size: 7,
            cur_page: 1
            // lat: 0,
            // lng: 0,
            // cur_size: 10
        }
        wx.request({
            url: `http://wxapptest.cloudinlink.com/Info/v1/homePageDiscover?token=${data.token}&cur_page=${data.cur_page}&user_id=${data.user_id}&role_id=${data.role_id}&lat=${data.lat}&lng=${data.lng}&cur_size=${data.cur_size}`,
            success: function (res) {
                let img_data = res.data.data.res_info
                let total_page = res.data.data.total_page
                This.setData({
                    img_data,
                    total_page
                })
                This.loadImages(img_data);
            }
        })
    },
    /**
     * 页面在加载执行的是先执行加载一页
     * */
    async loadImages(img_datas) {
        let img_data = img_datas
        let Arr1_num = 0;
        let Arr2_num = 0;
        let Arr1 = []
        let Arr2 = []
        let new_arr1 = []
        let new_arr2 = []
        for (let i in img_data) {
            await new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: `https://image.cloudinlink.com/${img_data[i].image}`,
                    success: res => {
                        img_data[i]['wid'] = res.width
                        img_data[i]['hid'] = res.height
                        if (Arr1_num > Arr2_num) {
                            // debugger
                            Arr2_num += res.height
                            Arr2.push(res.height)
                            new_arr2.push(res)
                        } else {
                            Arr1_num += res.height
                            Arr1.push(res.height)
                            new_arr1.push(res)
                        }
                        // Arr1.forEach((item, index) => {
                        // })
                        // Arr2.forEach((item, index) => {
                        // })
                        // if (!that.data.data) { //这是后台取出的数据，数组
                        //     for (let i = 0; i < res.data.data.length; i++) { //在这里获取后台的数组
                        //         // debugger
                        //         // debugger
                        //         if (i % 2 == 1) { //这里进行获取的 奇数偶数来进行数据分开
                        //             Arr1.push(res.data.data[i]); //数组添加数据
                        //         } else {
                        //             Arr2.push(res.data.data[i]); //数组添加数据
                        //         }
                        //     }
                        //     that.setData({
                        //         Arr1, //这里在进行数据赋值
                        //         Arr2, //这里在进行数据赋值
                        //         page: ++that.data.page
                        //     });
                        resolve()
                    }
                })
            });
        }
        // setTimeout(() => {
        console.log(img_data, 222222222222222)
        console.log(Arr1_num)
        console.log(Arr2_num)
        console.log(Arr1)
        console.log(Arr2)
        console.log(new_arr1)
        console.log(new_arr2)
        // }, 20)
        console.log(new_arr1)
        console.log(new_arr2)
        this.setData({
            Arr1: new_arr1,
            Arr2: new_arr2
        })
        // setTimeout(function {

        // }, 0)
        // if (that.data.img_load_l > that.data.img_load_r) {
        //     console.log('右边长')
        // } else {
        //     console.log('左边长')
        // }
        // let data = {
        //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuY2xvdWRpbmxpbmsuY29tIiwiYXVkIjoiY2xvdWRpbmxpbmtfd3hhcHAiLCJpYXQiOjE1ODc0NTg1MjksImV4cCI6MTU5MDA1MDUyOSwidWlkIjoiMSIsInJpZCI6IjEiLCJwaG9uZSI6bnVsbH0.KLCDHkXvPVPCk-zQlx_4BIU_5_vwLkexMTkTi2AexVA',
        //     user_id: 22,
        //     role_id: 1,
        //     lat: 28.23529,
        //     lng: 112.93134,
        //     cur_size: 3,
        //     cur_page: 1
        //     // lat: 0,
        //     // lng: 0,
        //     // cur_size: 10
        // }
        // wx.request({
        //     url: `http://wxapptest.cloudinlink.com/Info/v1/homePageDiscover?token=${data.token}&cur_page=${data.cur_page}&user_id=${data.user_id}&role_id=${data.role_id}&lat=${data.lat}&lng=${data.lng}&cur_size=${data.cur_size}`,
        //     success: function (res) {
        //         let img_data = res.data.data.res_info
        //         let new_img = JSON.parse(JSON.stringify(img_data))
        //         for (let i in new_img) {
        //             await new Promise((resolve, reject) => {
        //                 wx.getImageInfo({
        //                     src: `https://image.cloudinlink.com/${new_img[i].image}`,
        //                     success: res => {
        //                         // debugger
        //                         new_img[index]['wid'] = res.width
        //                         new_img[index]['hid'] = res.height
        //                         // new_img[index].push({
        //                         //     wid: item.width,
        //                         //     hid: item.height
        //                         // })
        //                     }
        //                 })
        //                 resolve()
        //             });
        //         }

        //         // img_data.forEach((item, index) => {

        //         // data建立数组col1 和 col2
        //         // debugger
        //         // let {
        //         //     Arr1,
        //         //     Arr2
        //         // } = that.data.res_info

        //         // if (!that.data.data) { //这是后台取出的数据，数组
        //         //     for (let i = 0; i < res.data.data.length; i++) { //在这里获取后台的数组
        //         //         // debugger
        //         //         // debugger
        //         //         if (i % 2 == 1) { //这里进行获取的 奇数偶数来进行数据分开
        //         //             Arr1.push(res.data.data[i]); //数组添加数据
        //         //         } else {
        //         //             Arr2.push(res.data.data[i]); //数组添加数据
        //         //         }
        //         //     }
        //         //     that.setData({
        //         //         Arr1, //这里在进行数据赋值
        //         //         Arr2, //这里在进行数据赋值
        //         //         page: ++that.data.page
        //         //     });

        //         // }
        //         // let img_arr = []
        //         // let data = res.data.data
        //         // data.forEach((item, index) => {
        //         //     img_arr.push('https://image.cloudinlink.com/' + item.image)
        //         // })
        //         // // debugger
        //         // wx.hideToast()
        //         // that.setData({
        //         //     loadingCount: img_arr.length,
        //         //     images: img_arr,
        //         //     page: that.data.page + 1
        //         // })

        //         // })
        //         console.log(new_img)
        //         debugger
        //     }
        // })
    },
    /**
     * 上拉加载
     * */
    // lower: function (e) {
    //     wx.request({
    //         url: 'http://www.love594.cn/index.php/Index/imglist',
    //         data: {
    //             p: ++page
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: (res) => {
    //             console.log(res.data);
    //             if (res.data.arr) {
    //                 // data建立数组col1 和 col2
    //                 let {
    //                     Arr1,
    //                     Arr2
    //                 } = this.data
    //                 for (let i = 0; i < res.data.arr.length; i++) {
    //                     if (res.data.arr[i].id % 2 == 1) {
    //                         Arr1.push(res.data.arr[i]);
    //                     } else {
    //                         Arr2.push(res.data.arr[i]);
    //                     }
    //                 }
    //                 this.setData({
    //                     Arr1,
    //                     Arr2
    //                 });
    //             }
    //         }
    //     });
    // },
    /**
     * 页面隐藏事件
     * */
    // onUnload: function () {},
    // /**
    //  * 页面上拉触底事件的处理函数
    //  * */
    // lower: function () {
    //     this.loadImages()
    //     // 监听用户上拉触底事件。
    //     // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
    //     // 在触发距离内滑动期间，本事件只会被触发一次。
    // }
});