import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { withProviders } from '@/shared/providers/utils/with-providers'
import { routerProvider } from '@/shared/providers/router-provider'
import styles from './styles.module.css'

export const Dashboard: React.FC = withProviders([routerProvider], ({ router }) => {
	const [collapsed, _setCollapsed] = useState(false)

	// const toggleCollapsed = () => setCollapsed((prev) => !prev)

	const handleMenuClick = (info: IMenuInfo) => {
		console.log('Menu item clicked:', info)
	}

	return (
		<Layout className={styles.layout}>
			<Layout.Sider collapsed={collapsed} theme="dark">
				<Menu
					theme="dark"
					selectedKeys={[router.location.pathname]}
					mode="inline"
					items={menuItems}
					onClick={handleMenuClick}
				/>
			</Layout.Sider>
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

interface IMenuInfo {
	key: string
	keyPath: string[]
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}
