export class CheckUserPermissionsResponse {
	public readonly hasPermission: boolean

	constructor(params: IConstructor) {
		this.hasPermission = params.hasPermission
	}
}

interface IConstructor {
	hasPermission: boolean
}
