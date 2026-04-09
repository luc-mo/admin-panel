import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useUsers } from './use-users'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'
import type { IUserWithRoles, IRoleCategory } from '@princesitas/core'

import { PageHeader } from '@/ui/components/page-header'
import { UserModal } from '@/ui/components/user-modal'
import styles from './styles.module.css'

export const Users: React.FC = () => {
	const { sharedData } = useProviders([sharedDataProvider])
	const users = useUsers()

	const actionsRender = {
		title: 'Acciones',
		key: 'actions',
		dataIndex: 'id',
		width: 150,
		render: (_: any, user: IUserWithRoles) => (
			<Space size="small">
				<Button
					type="text"
					icon={<EyeOutlined />}
					onClick={() => console.log('Ver usuario:', user)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => console.log('Editar usuario:', user)}
					title="Editar"
				/>
				<Popconfirm
					open={users.removeUserPopUp.isOpen(user.id)}
					title="Eliminar usuario"
					description="¿Estás seguro de eliminar este usuario?"
					okText="Sí"
					cancelText="No"
					placement="leftTop"
					onConfirm={() => users.onRemoveUser(user.id)}
					onOpenChange={users.removeUserPopUp.toggle(user.id)}
					okButtonProps={{ loading: users.loadings.removeUser }}
					classNames={{ root: styles.pup_up_buttons }}
					cancelButtonProps={{
						className: styles.popup_cancell_button,
						disabled: users.loadings.removeUser,
					}}
				>
					<Button type="text" title="Eliminar" icon={<DeleteOutlined />} danger />
				</Popconfirm>
			</Space>
		),
	}

	return (
		<>
			<PageHeader
				title="Administración de Usuarios"
				newItemText="Nuevo Usuario"
				onNewItemClick={users.createUserToggle.open}
			/>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={users.data}
				loading={users.loadings.findUsers}
				pagination={{
					total: users.pagination.total,
					current: users.pagination.page,
					pageSize: users.pagination.limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} usuarios`,
				}}
				onChange={(args) => users.onPaginationChange(args)}
			/>

			<UserModal
				isOpen={users.createUserToggle.isOpen}
				isLoading={users.loadings.createUser}
				title="Crear Nuevo Usuario"
				roles={sharedData.allRoles.data}
				onCancel={users.createUserToggle.close}
				onSubmit={users.onCreateUser}
			/>
		</>
	)
}

const tableColumns: ColumnsType<IUserWithRoles> = [
	{
		title: 'Nombre de usuario',
		dataIndex: 'username',
		key: 'username',
		minWidth: 150,
		width: 250,
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		minWidth: 200,
		width: 300,
	},
	{
		title: 'Roles',
		render: (user: IUserWithRoles) => {
			const roleColors: Record<IRoleCategory, string> = {
				ADMIN: 'blue',
				EDITOR: 'green',
				READER: 'geekblue',
				OTHER: 'default',
			}
			const visibleRoles = user.roles.slice(0, user.isSuperAdmin ? 1 : 2)
			const remainingRolesCount = user.roles.length - visibleRoles.length
			return (
				<Space size={6} wrap>
					{user.isSuperAdmin && <Tag color="purple"> Super Admin</Tag>}
					{visibleRoles.map((role) => (
						<Tag key={role.id} color={roleColors[role.category] || 'default'}>
							{role.name}
						</Tag>
					))}
					{remainingRolesCount > 0 && <Tag color="grey">+{remainingRolesCount} más</Tag>}
				</Space>
			)
		},
	},
	{
		title: 'Fecha de creación',
		dataIndex: 'createdAt',
		key: 'createdAt',
		minWidth: 150,
		width: 200,
		render: (date: Date) => date.toLocaleDateString(),
	},
]
