import FLY from '../config'
const _ENV = process.TYPE_ENV
console.log(_ENV)
let path = _ENV !== 'production' ? '/ERPService.svc/DoService' : '/backends/ERPService.svc/DoService'
export default {
	bankList(params) {
		return FLY.post(/* '/backends/ERPService.svc/DoService' */ path, {
			Message: {
				...params
			}
		})
	}
}
