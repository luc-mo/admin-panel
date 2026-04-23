import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useUsers } from './use-users'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'
import type { IUserWithRoles, IRoleCategory } from '@admin-panel/core'

import { AccessGuard } from '@/ui/guards/access-guard'
import { NotFound } from '@/ui/layouts/not-found'
import { PageHeader } from '@/ui/components/page-header'
import { ViewUserModal } from '@/ui/components/user/view-user-modal'
import { CreateUserModal } from '@/ui/components/user/create-user-modal'
import { UpdateUserModal } from '@/ui/components/user/update-user-modal'

import { usersPagePermissions } from '@/ui/constants/page-permissions'
import styles from './styles.module.css'

export const Users: React.FC = AccessGuard.withAccess({
	permissions: usersPagePermissions,
	Fallback: NotFound,
	Component: () => {
		const { sharedData } = useProviders([sharedDataProvider])
		const users = useUsers()

		const actionsRender = {
			title: 'Acciones',
			key: 'actions',
			dataIndex: 'id',
			align: 'center' as const,
			width: 150,
			render: (_: any, user: IUserWithRoles) => (
				<Space size="small">
					<AccessGuard permissions={['user:view']}>
						<Button
							type="text"
							icon={<EyeOutlined />}
							onClick={() => users.viewUserPopUp.open(user.id)}
							title="Ver"
						/>
					</AccessGuard>
					<AccessGuard permissions={['user:update']}>
						<Button
							type="text"
							icon={<EditOutlined />}
							onClick={() => users.updateUserToggle.open(user.id)}
							title="Editar"
						/>
					</AccessGuard>
					<AccessGuard permissions={['user:delete']}>
						<Popconfirm
							open={users.removeUserPopUp.isOpen(user.id)}
							placement="leftTop"
							title="Eliminar usuario"
							description="¿Estás seguro de eliminar este usuario?"
							okText="Sí"
							cancelText="No"
							classNames={{ root: styles.pup_up_buttons }}
							okButtonProps={{ loading: users.loadings.removeUser }}
							cancelButtonProps={{
								className: styles.popup_cancell_button,
								disabled: users.loadings.removeUser,
							}}
							onConfirm={() => users.onRemoveUser(user.id)}
							onOpenChange={(isOpen) => {
								if (!isOpen && users.loadings.removeUser) return
								users.removeUserPopUp.toggle(user.id)(isOpen)
							}}
						>
							<Button type="text" title="Eliminar" icon={<DeleteOutlined />} danger />
						</Popconfirm>
					</AccessGuard>
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

				<ViewUserModal
					openId={users.viewUserPopUp.openId}
					users={users.data}
					onCancel={users.viewUserPopUp.close}
				/>

				<CreateUserModal
					isOpen={users.createUserToggle.isOpen}
					isLoading={users.loadings.createUser}
					title="Crear Nuevo Usuario"
					roles={sharedData.allRoles.data}
					onCancel={users.createUserToggle.close}
					onSubmit={users.onCreateUser}
				/>

				<UpdateUserModal
					openId={users.updateUserToggle.openId}
					isLoading={users.loadings.updateUser}
					users={users.data}
					roles={sharedData.allRoles.data}
					onCancel={users.updateUserToggle.close}
					onSubmit={users.onUpdateUser}
				/>
			</>
		)
	},
})

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
