import { ConfigProvider, Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { useProviders } from '@/providers/utils/use-providers'
import { authProvider } from '@/providers/auth-provider'
import styles from './styles.module.css'

export const Login: React.FC = () => {
	const { auth } = useProviders([authProvider])
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

					<Form onFinish={auth.logIn} layout="vertical" requiredMark={false}>
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
							<Button
								type="primary"
								htmlType="submit"
								loading={auth.loadings.logIn}
								block
								size="large"
							>
								Iniciar sesión
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</main>
		</ConfigProvider>
	)
}

const themeConfig = {
	components: {
		Form: {
			itemMarginBottom: 26,
		},
	},
}
