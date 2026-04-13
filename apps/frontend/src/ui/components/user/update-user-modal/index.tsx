import { useEffect } from 'react'
import { Modal, Form, Input, Select, Tag } from 'antd'
import { roleTagColors } from '@/ui/constants/tags'
import type { IRole, IUserWithRoles, StrictOmit } from '@princesitas/core'
import type { IUpdateUserParams } from '@/application/user/use-update-user'
import styles from './styles.module.css'

interface IUpdateUserModalProps {
	openId: string | null
	isLoading: boolean
	users: IUserWithRoles[]
	roles: IRole[]
	onSubmit: (data: IUpdateUserParams) => Promise<void>
	onCancel: () => void
}

export const UpdateUserModal: React.FC<IUpdateUserModalProps> = ({
	openId,
	isLoading,
	users,
	roles,
	onSubmit,
	onCancel,
}) => {
	const [form] = Form.useForm()
	const user = users.find((user) => user.id === openId)

	const handleSubmit = async (values: StrictOmit<IUpdateUserParams, 'id'>) => {
		if (!user) return
		await onSubmit({ id: user.id, ...values })
		form.resetFields()
	}

	const handleCancel = () => {
		form.resetFields()
		onCancel()
	}

	useEffect(() => {
		if (!user) {
			form.resetFields()
			return
		}
		form.setFieldsValue({
			username: user.username,
			roles: user.roles.map((role) => role.id),
		})
	}, [user])

	return (
		<Modal
			open={Boolean(openId)}
			title="Editar usuario"
			okText="Actualizar usuario"
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
				<Form.Item label="Correo electrónico">
					<Input className={styles.input} value={user?.email} disabled />
				</Form.Item>

				<Form.Item
					name="username"
					label="Nombre de usuario"
					rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
				>
					<Input placeholder="Ej: juan123" />
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
