import { useEffect } from 'react'
import { Modal, Form, Input, Select, Tag } from 'antd'
import { methodOptions } from '@/ui/constants/options'
import { roleTagColors, permissionMethodTagColors } from '@/ui/constants/tags'
import type { IRole, IEndpointWithRoles, IEndpointMethod, StrictOmit } from '@admin-panel/core'
import type { IUpdateEndpointParams } from '@/application/endpoint/use-update-endpoint'
import styles from './styles.module.css'

interface IUpdateEndpointModalProps {
	openId: string | null
	isLoading: boolean
	endpoints: IEndpointWithRoles[]
	roles: IRole[]
	onSubmit: (data: IUpdateEndpointParams) => Promise<void>
	onCancel: () => void
}

export const UpdateEndpointModal: React.FC<IUpdateEndpointModalProps> = ({
	openId,
	isLoading,
	endpoints,
	roles,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()
	const endpoint = endpoints.find((e) => e.id === openId)

	const handleSubmit = async (values: StrictOmit<IUpdateEndpointParams, 'id'>) => {
		if (!endpoint) return
		await onSubmit({ id: endpoint.id, ...values })
		form.resetFields()
	}

	const handleCancel = () => {
		form.resetFields()
		onCancel()
	}

	useEffect(() => {
		if (!endpoint) {
			form.resetFields()
			return
		}
		form.setFieldsValue({
			path: endpoint.path,
			method: endpoint.method,
			roles: endpoint.roles.map((role) => role.id),
		})
	}, [endpoint])

	return (
		<Modal
			open={Boolean(openId)}
			title="Editar endpoint"
			okText="Actualizar endpoint"
			cancelText="Cancelar"
			confirmLoading={isLoading}
			closable={{ disabled: isLoading }}
			cancelButtonProps={{
				className: styles.cancel_button,
				disabled: isLoading,
			}}
			onOk={form.submit}
			onCancel={handleCancel}
		>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					name="method"
					label="Método"
					rules={[{ required: true, message: 'Por favor selecciona el método HTTP' }]}
				>
					<Select
						placeholder="Selecciona el método"
						options={methodOptions}
						labelRender={({ value }) => (
							<Tag color={permissionMethodTagColors[value as IEndpointMethod]}>{value}</Tag>
						)}
					/>
				</Form.Item>

				<Form.Item
					name="path"
					label="Ruta"
					rules={[{ required: true, message: 'Por favor ingresa la ruta del endpoint' }]}
				>
					<Input placeholder="Ej: /api/users" />
				</Form.Item>

				<Form.Item
					name="roles"
					label="Roles"
					rules={[{ required: true, message: 'Por favor selecciona al menos un rol' }]}
				>
					<Select
						mode="multiple"
						placeholder="Selecciona los roles"
						options={roles.map((role) => ({
							label: role.name,
							value: role.id,
						}))}
						maxTagCount={2}
						maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} más`}
						tagRender={({ label, value, closable, onClose }) => {
							const role = roles.find((r) => r.id === value)!
							return (
								<Tag
									color={roleTagColors[role?.category] || 'default'}
									closable={closable}
									onClose={onClose}
									style={{ marginRight: 3 }}
								>
									{label}
								</Tag>
							)
						}}
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
