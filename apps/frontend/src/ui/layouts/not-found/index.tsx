import { Button, Result } from 'antd'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { routerProvider } from '@/ui/providers/router-provider'
import styles from './styles.module.css'

export const NotFound: React.FC = () => {
	const { router } = useProviders([routerProvider])

	return (
		<div className={styles.container}>
			<Result
				status="404"
				title="404"
				subTitle="La página que buscas no existe."
				extra={
					<Button type="primary" onClick={() => router.navigate('/dashboard')}>
						Volver al inicio
					</Button>
				}
			/>
		</div>
	)
}
