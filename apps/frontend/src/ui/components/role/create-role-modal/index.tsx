import { Modal, Form, Input, Select, Tag } from 'antd'
import type { IPermission, IRoleCategory } from '@admin-panel/core'
import type { ICreateRoleParams } from '@/application/role/use-create-role'
import { permissionTagColors } from '@/ui/constants/tags'
import styles from './styles.module.css'

interface ICreateRoleModalProps {
	isOpen: boolean
	isLoading: boolean
	title: string
	permissions: IPermission[]
	onSubmit: (data: ICreateRoleParams) => Promise<void>
	onCancel: () => void
}

export const CreateRoleModal: React.FC<ICreateRoleModalProps> = ({
	isOpen,
	isLoading,
	title,
	permissions,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()

	const handleSubmit = async (values: ICreateRoleParams) => {
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
			okText="Crear rol"
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
					rules={[{ required: true, message: 'Por favor ingresa el nombre del rol' }]}
				>
					<Input placeholder="Ej: Administrador" />
				</Form.Item>

				<Form.Item
					name="description"
					label="Descripción"
					rules={[{ required: true, message: 'Por favor ingresa la descripción del rol' }]}
				>
					<Input placeholder="Ej: Rol con acceso total al sistema" />
				</Form.Item>

				<Form.Item
					name="category"
					label="Categoría"
					rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
				>
					<Select placeholder="Selecciona la categoría" options={categoryOptions} />
				</Form.Item>

				<Form.Item
					name="permissions"
					label="Permisos"
					rules={[{ required: true, message: 'Por favor selecciona al menos un permiso' }]}
				>
					<Select
						mode="multiple"
						placeholder="Selecciona los permisos"
						options={permissions.map((permission) => ({
							label: permission.name,
							value: permission.id,
						}))}
						maxTagCount={3}
						maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} más`}
						tagRender={({ label, value, closable, onClose }) => {
							const permission = permissions.find((p) => p.id === value)!
							const action = permission?.key.split(':')[1]
							return (
								<Tag
									color={permissionTagColors[action] || 'default'}
									closable={closable}
									onClose={onClose}
									style={{ marginInlineEnd: 4 }}
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

const categoryOptions: { label: string; value: IRoleCategory }[] = [
	{ label: 'Administrador', value: 'ADMIN' },
	{ label: 'Editor', value: 'EDITOR' },
	{ label: 'Lector', value: 'READER' },
	{ label: 'Otro', value: 'OTHER' },
]
