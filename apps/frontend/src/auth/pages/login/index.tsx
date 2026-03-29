import { ConfigProvider, Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { withProviders } from '@/shared/providers/utils/with-providers'
import { routerProvider } from '@/shared/providers/router-provider'

import { useAuth } from '@/auth/hooks/use-auth'
import styles from './styles.module.css'

export const Login: React.FC = withProviders([routerProvider], () => {
	const { loadings, logIn } = useAuth()

	return (
		<ConfigProvider theme={themeConfig}>
			<main className={styles.layout}>
				<Card className={styles.card}>
					<header className={styles.header}>
						<Typography.Title className={styles.title} level={3}>
							Administración Princesitas
						</Typography.Title>
						<Typography.Text type="secondary">
							Ingresa tus credenciales para continuar
						</Typography.Text>
					</header>

					<Form onFinish={logIn} layout="vertical" requiredMark={false}>
						<Form.Item
							name="email"
							rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
						>
							<Input prefix={<UserOutlined />} placeholder="Correo electrónico" size="large" />
						</Form.Item>

						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
						</Form.Item>

						<Form.Item className={styles.submit_item}>
							<Button type="primary" htmlType="submit" loading={loadings.logIn} block size="large">
								Iniciar sesión
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</main>
		</ConfigProvider>
	)
})

const themeConfig = {
	components: {
		Form: {
			itemMarginBottom: 26,
		},
	},
}
