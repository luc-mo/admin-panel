import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

import { withProviders } from '@/ui/providers/utils/with-providers'
import { useProviders } from '@/ui/providers/utils/use-providers'

import { routerProvider } from '@/ui/providers/router-provider'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'
import { useDashboard } from './use-dashboard'

import { UserCard } from '@/ui/components/user-card'
import styles from './styles.module.css'

export const Dashboard: React.FC = withProviders([coreServicesProvider, sharedDataProvider], () => {
	const { router, sharedData } = useProviders([routerProvider, sharedDataProvider])
	const { onMenuClick } = useDashboard()

	return (
		<Layout className={styles.layout}>
			<Layout.Sider width={300} theme="dark">
				<UserCard user={sharedData.currentUser.data} loading={sharedData.currentUser.loading} />

				<Menu
					theme="dark"
					selectedKeys={[router.location.pathname]}
					mode="inline"
					items={menuItems}
					onClick={onMenuClick}
				/>
			</Layout.Sider>

			<Layout>
				<Layout.Content className={styles.content}>
					<Outlet />
				</Layout.Content>
			</Layout>
		</Layout>
	)
})

const menuItems = [
	{
		key: '/dashboard',
		icon: <HomeOutlined />,
		label: 'Inicio',
	},
	{
		key: '/dashboard/users',
		icon: <UserOutlined />,
		label: 'Usuarios',
	},
	{
		key: '/dashboard/roles',
		icon: <TeamOutlined />,
		label: 'Roles',
	},
	{
		key: 'logout',
		icon: <LogoutOutlined />,
		label: 'Cerrar sesión',
		danger: true,
	},
]
