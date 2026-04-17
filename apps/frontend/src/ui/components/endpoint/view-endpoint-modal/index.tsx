import { Modal, Tag, Descriptions } from 'antd'
import { roleTagColors, permissionMethodTagColors } from '@/ui/constants/tags'
import type { IEndpointWithRoles } from '@princesitas/core'

interface IViewEndpointModalProps {
	openId: string | null
	endpoints: IEndpointWithRoles[]
	onCancel: () => void
}

export const ViewEndpointModal: React.FC<IViewEndpointModalProps> = ({
	openId,
	endpoints,
	onCancel,
}) => {
	const endpoint = endpoints.find((e) => e.id === openId)
	return (
		<Modal open={Boolean(openId)} title="Ver endpoint" footer={null} onCancel={onCancel}>
			<Descriptions column={1} bordered size="small">
				<Descriptions.Item label="Método">
					<Tag color={endpoint?.method ? permissionMethodTagColors[endpoint.method] : undefined}>
						{endpoint?.method}
					</Tag>
				</Descriptions.Item>
				<Descriptions.Item label="Ruta">{endpoint?.path}</Descriptions.Item>
				<Descriptions.Item label="Roles">
					<div
						style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
					>
						{endpoint?.roles.map((role) => (
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
