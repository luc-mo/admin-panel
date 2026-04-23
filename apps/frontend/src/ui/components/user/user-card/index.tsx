import { Avatar, Skeleton } from 'antd'
import styles from './styles.module.css'
import type { IUser } from '@admin-panel/core'

interface IUserCardProps {
	user: IUser | null
	loading: boolean
}

export const UserCard: React.FC<IUserCardProps> = ({ user, loading }) => {
	const isLoading = loading || !user
	return (
		<div className={styles.container}>
			<Avatar
				className={styles.avatar}
				size={48}
				alt="Avatar del usuario"
				src="https://cataas.com/cat/0BTTVEVWXNyOgXYd?width=150"
			/>
			<section className={styles.user_info}>
				{isLoading ? <UserSkeleton /> : <div className={styles.user_name}>{user.username}</div>}
				{isLoading ? <UserSkeleton /> : <div className={styles.user_email}>{user.email}</div>}
			</section>
		</div>
	)
}

const UserSkeleton: React.FC = () => {
	return (
		<Skeleton.Button
			rootClassName={styles.user_skeleton}
			className={styles.user_skeleton}
			size="small"
			active
			block
		/>
	)
}
