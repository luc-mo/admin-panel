import { Modal, Tag, Descriptions } from 'antd'
import { permissionTagColors } from '@/ui/constants/tags'
import type { IPermission } from '@princesitas/core'

interface IViewPermissionModalProps {
	openId: string | null
	permissions: IPermission[]
	onCancel: () => void
}

export const ViewPermissionModal: React.FC<IViewPermissionModalProps> = ({
	openId,
	permissions,
	onCancel,
}) => {
	const permission = permissions.find((p) => p.id === openId)
	const action = permission?.key.split(':')[1]

	return (
		<Modal open={Boolean(openId)} title="Ver permiso" footer={null} onCancel={onCancel}>
			<Descriptions column={1} bordered size="small">
				<Descriptions.Item label="Nombre">{permission?.name}</Descriptions.Item>
				<Descriptions.Item label="Clave">
					{permission && (
						<Tag color={permissionTagColors[action!] || 'default'}>{permission.key}</Tag>
					)}
				</Descriptions.Item>
				<Descriptions.Item label="Fecha de creación">
					{permission?.createdAt.toLocaleDateString()}
				</Descriptions.Item>
				<Descriptions.Item label="Última actualización">
					{permission?.updatedAt.toLocaleDateString()}
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	)
}
