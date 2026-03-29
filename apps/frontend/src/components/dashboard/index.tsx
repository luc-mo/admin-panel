import { Outlet } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { HomeOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

import { withProviders } from '@/providers/utils/with-providers'
import { routerProvider } from '@/providers/router-provider'
import { useDashboardMenu } from '@/hooks/use-dashboard-menu'

import { cn } from '@/utils/cn'
import styles from './styles.module.css'

export const Dashboard: React.FC = withProviders([routerProvider], ({ router }) => {
	const { onMenuClick } = useDashboardMenu()

	return (
		<Layout className={styles.layout}>
			<Layout.Sider width={300} theme="dark">
				<div className={cn(styles.avatar_container)}>
					<Avatar
						className={styles.avatar}
						size={48}
						alt="Avatar del usuario"
						src="https://cataas.com/cat/0BTTVEVWXNyOgXYd?width=150"
					/>
					<section>
						<div className={styles.user_name}>Administrador</div>
						<div className={styles.user_email}>admin@sistema.com</div>
					</section>
				</div>

				<Menu
					theme="dark"
					selectedKeys={[router.location.pathname]}
					mode="inline"
					items={menuItems}
					onClick={onMenuClick}
				/>
			</Layout.Sider>

			<Layout>
				<Layout.Content>
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
