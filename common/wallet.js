/**
 * 实例化合约对象，该对象上有send(交易)和getBalance(获取余额)两个方法
 * @returns {object}实例化合约对象
 * @property {Object} control 
 * @property {function} send 交易
 * @property {function} getBalance 获取余额
 * @example
 * let loo = new Wallet('合约地址')
 * loo.send(address,value).then(res=>'交易hashId')
 * loo.getBalance(address).then(res=>0)
 */
class Wallet {
	/**
	 * @param {string} contractAddress 要创建的合约地址(config.scene为web3时可为空字符串)
	 * @param {function} callback 创建成功后的回调
	 * @param {Object} config 其他合约创建信息
	 * @property {Object} config 其他合约创建信息
	 * @property {string} config.scene web3,tronWeb(必填)
	 * @property {object} config.Web3 web3对象(scene为web3时必填)
	 */
	constructor(contractAddress, callback, config) {
		switch(config.scene){
			case 'web3':
				this.control = config.methods
				this.send = this.EthSend
				this.getBalance = this.EthGetBanance
				if (typeof callback == 'function') setTimeout(()=>{callback('web3')})
				break;
			case 'tron':
				tronWeb.contract().at(contractAddress).then(res => {
					this.control = res
					this.send = this.TronSend
					this.getBalance = this.TronGetBalance
					if (typeof callback == 'function')  setTimeout(()=>{callback('tron')})
				})
				break;
		}
	}
	/**
	 * Eth获取余额
	 * @param {Object} address
	 */
	EthGetBanance(address) {
		return new Promise((resolve, reject) => {
			this.control.balanceOf(address).call().then(res => {
				resolve(Number((res+'').substring(0,res.length-18)))
			})
		})
	}
	/**
	 * Tron获取余额
	 * @param {String} address 钱包地址
	 * @returns {Object} Promise
	 */
	TronGetBalance(address) {
		return new Promise((resolve, reject) => {
			this.control.balanceOf(address).call().then(res => {
				resolve(res.toNumber()/Math.pow(10,6))
			})
		})
	}
	/**
	 * Eth交易
	 * @param {String} address 
	 * @param {Object} value
	 * @param {Object} config
	 */
	EthSend(address, value, config) {
		return new Promise((resolve,reject)=>{
			// 使用promise
			// this.control.sendTransaction({
			//     from: config.from,
			//     to: address,
			//     value:value+'000000000000000000'
			// }).then((err,res)=>{
			// 	if(err){
			// 		console.log("err: ",err);
			// 	}
			// 	if(res){
			// 		console.log("res: ",res);
			// 	}
			// 	// resolve(transactionHash)
			// });
			this.control.transfer(address, value+'000000000000000000').send({
				from: config.from
			}, function(error, transactionHash) {
				if(transactionHash){
					resolve(transactionHash)
				}else if(error){
					reject(error)
				}
			})
		})
		
	}
	/**
	 * Tron交易
	 * @param {String} address 收款钱包地址
	 * @param {Number} value 数量
	 */
	TronSend(address, value) {
		return new Promise((resolve, reject) => {
			this.control.transfer(address, tronWeb.toHex(value * Math.pow(10, 6))).send({
				feeLimit: 10000000,
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
export default Wallet
