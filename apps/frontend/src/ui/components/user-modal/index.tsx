import { Modal, Form, Input, Select, Tag } from 'antd'
import { roleTagColors } from '@/ui/constants/tags'
import type { IRole } from '@princesitas/core'
import type { ICreateUserParams } from '@/application/user/use-create-user'
import styles from './styles.module.css'

interface IUserModalProps {
	isOpen: boolean
	isLoading: boolean
	title: string
	roles: IRole[]
	onSubmit: (data: ICreateUserParams) => Promise<void>
	onCancel: () => void
}

export const UserModal: React.FC<IUserModalProps> = ({
	isOpen,
	isLoading,
	title,
	roles,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()

	const handleSubmit = async (values: ICreateUserParams) => {
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
			okText="Crear usuario"
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
			<Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: true }}>
				<Form.Item
					name="email"
					label="Correo electrónico"
					rules={[
						{ required: true, message: 'Por favor ingresa el correo' },
						{ type: 'email', message: 'Ingresa un correo válido' },
					]}
				>
					<Input placeholder="Ej: juan@example.com" />
				</Form.Item>

				<Form.Item
					name="username"
					label="Nombre de usuario"
					rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
				>
					<Input placeholder="Ej: juan123" />
				</Form.Item>

				<Form.Item
					name="password"
					label="Contraseña"
					rules={[
						{ required: true, message: 'Por favor ingresa la contraseña' },
						{ min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
					]}
				>
					<Input.Password placeholder="Mínimo 6 caracteres" />
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
