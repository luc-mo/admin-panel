import { Modal, Form, Input } from 'antd'
import type { ICreatePermissionParams } from '@/application/permission/use-create-permission'
import styles from './styles.module.css'

interface ICreatePermissionModalProps {
	isOpen: boolean
	isLoading: boolean
	title: string
	onSubmit: (data: ICreatePermissionParams) => Promise<void>
	onCancel: () => void
}

export const CreatePermissionModal: React.FC<ICreatePermissionModalProps> = ({
	isOpen,
	isLoading,
	title,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()

	const handleSubmit = async (values: ICreatePermissionParams) => {
		await onSubmit(values)
		form.resetFields()
	}

	const handleCancel = () => {
		form.resetFields()
		onCancel()
	}

	return (
		<Modal
			open={isOpen}
			title={title}
			okText="Crear permiso"
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
