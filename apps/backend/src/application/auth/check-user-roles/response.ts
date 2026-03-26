export class CheckUserRolesResponse {
	public readonly isAuthorized: boolean

	constructor(params: IConstructor) {
		this.isAuthorized = params.isAuthorized
	}
}

interface IConstructor {
	isAuthorized: boolean
}
