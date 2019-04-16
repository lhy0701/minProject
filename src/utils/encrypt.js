import CryptoJS, { SHA1 } from 'crypto-js'
// 17611650330  未注册
// 18810013034  失败
// 18701367882 0 审核中
/**
 * tokens 加密
 *
 * @param {*} message
 * @returns
 */
export const encryptByDES = (message) => {
	// 公钥
	var keyHex = CryptoJS.enc.Utf8.parse('jinmusen7931BEIJING')

	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	})
	return encrypted.toString()
}

/**
 * 密码加密
 *
 * @param {*} pwd
 * @returns
 */
export const encryptPassword = (pwd) => {
	const srcs = CryptoJS.enc.Utf8.parse(pwd)

	const encrypted = SHA1(srcs)

	return CryptoJS.enc.Base64.stringify(encrypted)
}
