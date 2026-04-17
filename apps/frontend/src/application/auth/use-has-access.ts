import { useProviders } from '@/ui/providers/utils/use-providers'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

export const useHasAccess = (permissionKeys: string[]) => {
	const { sharedData } = useProviders([sharedDataProvider])
	const { currentUser, allRoles, allPermissions } = sharedData

	const isLoading = currentUser.loading || allRoles.loading || allPermissions.loading
	if (isLoading || !currentUser.data) return false
	if (currentUser.data.isSuperAdmin || !permissionKeys.length) return true

	const permissionKeysSet = new Set(permissionKeys)
	const userRoles = currentUser.data.roles.map((roleId) => allRoles.dataMap.get(roleId)!)
	const userPermissions = userRoles.flatMap((role) =>
		role.permissions.map((permissionId) => allPermissions.dataMap.get(permissionId)!)
	)

	return userPermissions.some((permission) => permissionKeysSet.has(permission.key))
}
