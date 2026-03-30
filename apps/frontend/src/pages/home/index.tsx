import { Typography } from 'antd'
import styles from './styles.module.css'

export const Home = () => {
	return (
		<>
			<Typography.Title className={styles.title} level={2}>
				Bienvenido al Panel de Administración
			</Typography.Title>
			<Typography.Text type="secondary">
				Selecciona una opción del menú lateral para comenzar.
			</Typography.Text>
		</>
	)
}
