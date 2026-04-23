import { Modal, Tag, Descriptions } from 'antd'
import { roleTagColors } from '@/ui/constants/tags'
import type { IUserWithRoles } from '@admin-panel/core'

interface IViewUserModalProps {
	openId: string | null
	users: IUserWithRoles[]
	onCancel: () => void
}

export const ViewUserModal: React.FC<IViewUserModalProps> = ({ openId, users, onCancel }) => {
	const user = users.find((user) => user.id === openId)
	return (
		<Modal open={Boolean(openId)} title="Ver usuario" footer={null} onCancel={onCancel}>
			<Descriptions column={1} bordered size="small">
				<Descriptions.Item label="Correo electrónico">{user?.email}</Descriptions.Item>
				<Descriptions.Item label="Nombre de usuario">{user?.username}</Descriptions.Item>
				<Descriptions.Item label="Roles">
					<div
						style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
					>
						{user?.isSuperAdmin && <Tag color="purple"> Super Admin</Tag>}
						{user?.roles.map((role) => (
							<Tag key={role.id} color={roleTagColors[role.category] || 'default'}>
								{role.name}
							</Tag>
						))}
					</div>
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	)
}
