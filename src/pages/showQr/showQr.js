// pages/showQr/showQr.js
const QRCode = require('../../utils/create_qr.js')
Page({
	/**
   * 页面的初始数据
   */
	data: {
		isPrice: false,
		mPrice: 0,
		mContent: '',
		isPriceText: '设置金额后显示二维码',
		hasUserInfo: true
	},

	/**
   * 生命周期函数--监听页面加载
   */
	// onLoad: function(options) {
	// 	this.onLoginErp()
	// },

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		var that = this
		if (that.data.mPrice > 0) {
			that.onReqErp()
			that.setData({
				isPriceText: '¥ ' + that.data.mPrice
			})
		}
		if (!that.data.hasUserInfo) {
			wx.getSetting({
				success(res) {
					if (res.authSetting['scope.writePhotosAlbum']) {
						that.setData({
							hasUserInfo: true
						})
					}
				}
			})
		}
	},

	/**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function() {},

	/**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function() {},

	/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function() {},

	/**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function() {},

	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function() {},

	goPrice: function() {
		wx.navigateTo({
			url: '../../pages/inputPrice/inputPrice'
		})
	},

	// onLoginErp: function() {
	// 	wx.request({
	// 		url: 'http://192.168.1.138:9001/ERPService.svc/DoService', // 仅为示例，并非真实的接口地址
	// 		data:
	// 			'{"Message":{"Code":21101,"IsTokenLogin":false,"LoginPwd":"FBFnigueJe4vfIsveskranSz+cU=","Mobile":"18810013034"}}',
	// 		header: {
	// 			'content-type': 'application/json' // 默认值
	// 		},
	// 		method: 'POST',
	// 		success(res) {
	// 			wx.setStorageSync('sessionid', JSON.stringify(res.header['Set-Cookie']))
	// 		}
	// 	})
	// },

	onReqErp: function() {
		var that = this
		console.log(wx.getStorageSync('sessionid'))
		wx.request({
			url: 'http://192.168.1.138:9001/ERPService.svc/DoService', //'https://admin.chexd.com/backends/ERPService.svc/DoService',  // 仅为示例，并非真实的接口地址
			data:
				'{ "Message": { "Code": 31013, "Content": "' +
				that.data.mPrice +
				'", "ServiceId": 4, "SourceId": "2", "payApiTypeId": "2", "payTypeId":"1003"}}',
			header: {
				'content-type': 'application/json',
				cookie: wx.getStorageSync('sessionid') //读取cookie // 默认值
			},
			method: 'POST',
			success(res) {
				console.log(res.data.Message.Content)
				that.setData({
					mContent: res.data.Message.Content
				})
				that.onCreateQr()
			}
		})
	},

	onCreateQr: function() {
		var that = this
		//传入wxml中二维码canvas的canvas-id
		//单位为px
		var qrcode = new QRCode('canvas', {
			// usingIn: this,
			text: that.data.mContent,
			width: 150,
			height: 150,
			colorDark: '#000000',
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.H
		})
		this.setData({
			isPrice: true
		})
	},
	goDownload: function() {
		var that = this
		if (!that.data.isPrice) {
			wx.showToast({
				title: '请先生成收款二维码',
				icon: 'none',
				duration: 1000
			})
			return
		}
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.writePhotosAlbum']) {
					wx.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							console.log('授权成功')
						},
						fail: function(err) {
							if (err.errMsg == 'authorize:fail auth deny') {
								console.log(err)
								console.log('当初用户拒绝，再次发起授权')
								that.setData({
									hasUserInfo: false
								})
							}
						}
					})
				} else {
					that.onSaveCanvasImg()
				}
			}
		})
	},

	onSaveCanvasImg: function() {
		setTimeout(function() {
			// 将生成的canvas图片，转为真实图片
			wx.canvasToTempFilePath({
				canvasId: 'canvas',
				success: function(res) {
					let shareImg = res.tempFilePath
					wx.saveImageToPhotosAlbum({
						filePath: shareImg,
						success() {
							wx.showToast({
								title: '保存成功'
							})
						},
						fail() {
							wx.showToast({
								title: '保存失败',
								icon: 'none'
							})
						}
					})
				},
				fail: function(res) {}
			})
		}, 800)
	},
	goRecord: function() {
		wx.navigateTo({
			url: '../../pages/record/record'
		})
	}
})
