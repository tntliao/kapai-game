export const mixinsOne = {
	methods: {
		jup(address, user, type) {

			uni.navigateTo({
				url: `${address}?user=${user}&type=${type}`
			});
		},
		back() {

			uni.navigateBack({
				delta: 1
			})
		}
	}
}
