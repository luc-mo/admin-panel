import { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import type { IPermission, StrictOmit } from '@admin-panel/core'
import type { IUpdatePermissionParams } from '@/application/permission/use-update-permission'
import styles from './styles.module.css'

interface IUpdatePermissionModalProps {
	openId: string | null
	isLoading: boolean
	permissions: IPermission[]
	onSubmit: (data: IUpdatePermissionParams) => Promise<void>
	onCancel: () => void
}

export const UpdatePermissionModal: React.FC<IUpdatePermissionModalProps> = ({
	openId,
	isLoading,
	permissions,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()
	const permission = permissions.find((p) => p.id === openId)

	const handleSubmit = async (values: StrictOmit<IUpdatePermissionParams, 'id'>) => {
		if (!permission) return
		await onSubmit({ id: permission.id, ...values })
		form.resetFields()
	}

	const handleCancel = () => {
		form.resetFields()
		onCancel()
	}

	useEffect(() => {
		if (!permission) {
			form.resetFields()
			return
		}
		form.setFieldsValue({
			name: permission.name,
			key: permission.key,
		})
	}, [permission])

	return (
		<Modal
			open={Boolean(openId)}
			title="Editar permiso"
			okText="Actualizar permiso"
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
					name="name"
					label="Nombre"
					rules={[{ required: true, message: 'Por favor ingresa el nombre del permiso' }]}
				>
					<Input placeholder="Ej: Crear usuario" />
				</Form.Item>

				<Form.Item
					name="key"
					label="Clave"
					rules={[{ required: true, message: 'Por favor ingresa la clave del permiso' }]}
				>
					<Input placeholder="Ej: users:create" />
				</Form.Item>
			</Form>
		</Modal>
	)
}
