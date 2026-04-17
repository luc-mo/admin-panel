import { useHasAccess } from '@/application/auth/use-has-access'

interface IAccessGuardProps extends React.PropsWithChildren {
	permissions: string[]
	Fallback?: React.FC | null
}

interface IWithAccessProps<P extends object> {
	permissions: string[]
	Fallback?: React.FC | null
	Component: React.ComponentType<P>
}

const withAccess = <P extends object>({
	permissions,
	Fallback,
	Component,
}: IWithAccessProps<P>) => {
	return (props: P) => {
		const hasAccess = useHasAccess(permissions)
		if (!hasAccess) return Fallback ? <Fallback /> : null
		return <Component {...props} />
	}
}

const AccessGuard: React.FC<IAccessGuardProps> & { withAccess: typeof withAccess } = (props) => {
	const hasAccess = useHasAccess(props.permissions)
	if (!hasAccess) return props.Fallback ? <props.Fallback /> : null
	return props.children
}

AccessGuard.withAccess = withAccess

export { AccessGuard }
