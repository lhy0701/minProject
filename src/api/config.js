import Fly from 'flyio/dist/npm/wx'
import API_HOST from '../config/host'
const FLY = new Fly()
FLY.config.baseURL = API_HOST
// ;('https://admin.chexd.com')
// ;('http://192.168.1.138:9001')

FLY.interceptors.request.use((request) => {
	const token = wx.getStorageSync('sessionid')

	if (token) {
		// 'cookie': wx.getStorageSync("sessionid")//读取cookie // 默认值
		request.headers['Cookie'] = JSON.parse(token)[0]
		request.headers['Content-Type'] = 'application/json'
		console.log('has token ' + JSON.parse(token)[0])
	}
	return request
})

FLY.interceptors.response.use(
	(response) => {
		return response
	},
	(err) => {
		let code = err.status
		switch (code) {
			case 500:
				if (error.response.data) {
					wx.showToast({
						title: err.response.data.message || '',
						icon: 'none',
						duration: 3000
					})
				}
				break
			case 401:
				break
			case 403:
				break
		}
		return err
	}
)

export default FLY
