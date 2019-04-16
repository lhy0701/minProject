const _ENV = process.TYPE_ENV

let API_HOST
if (_ENV === 'production') {
	API_HOST = 'https://admin.chexd.com'
} else {
	API_HOST = 'http://192.168.1.138:9001'
}

export default API_HOST
