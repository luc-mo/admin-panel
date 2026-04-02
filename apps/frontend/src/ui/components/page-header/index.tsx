import { Typography, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

interface IPageHeaderProps {
	title: string
	newItemText: string
	onNewItemClick: () => void
}

export const PageHeader: React.FC<IPageHeaderProps> = (props) => {
	return (
		<header className={styles.header}>
			<Typography.Title className={styles.title} level={1}>
				{props.title}
			</Typography.Title>
			<Button type="primary" icon={<PlusOutlined />} onClick={props.onNewItemClick}>
				{props.newItemText}
			</Button>
		</header>
	)
}
