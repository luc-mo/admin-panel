import { Modal, Tag, Descriptions } from 'antd'
import { roleTagColors, roleCategoryLabels, permissionTagColors } from '@/ui/constants/tags'
import type { IRoleWithPermissions } from '@princesitas/core'

interface IViewRoleModalProps {
	openId: string | null
	roles: IRoleWithPermissions[]
	onCancel: () => void
}

export const ViewRoleModal: React.FC<IViewRoleModalProps> = ({ openId, roles, onCancel }) => {
	const role = roles.find((role) => role.id === openId)
	return (
		<Modal open={Boolean(openId)} title="Ver rol" footer={null} onCancel={onCancel}>
			<Descriptions column={1} bordered size="small">
				<Descriptions.Item label="Nombre">{role?.name}</Descriptions.Item>
				<Descriptions.Item label="Descripción">{role?.description}</Descriptions.Item>
				<Descriptions.Item label="Categoría">
					{role && (
						<Tag color={roleTagColors[role.category] || 'default'}>
							{roleCategoryLabels[role.category]}
						</Tag>
					)}
				</Descriptions.Item>
				<Descriptions.Item label="Permisos">
					<div
						style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
					>
						{role?.permissions.map((permission) => {
							const action = permission.key.split(':')[1]
							return (
								<Tag key={permission.id} color={permissionTagColors[action] || 'default'}>
									{permission.name}
								</Tag>
							)
						})}
					</div>
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	)
}
