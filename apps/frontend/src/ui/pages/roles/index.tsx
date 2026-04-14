import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useRoles } from './use-roles'
import type { IRoleWithPermissions, IRoleCategory } from '@princesitas/core'

import { useProviders } from '@/ui/providers/utils/use-providers'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'
import { PageHeader } from '@/ui/components/page-header'
import { CreateRoleModal } from '@/ui/components/role/create-role-modal'
import { UpdateRoleModal } from '@/ui/components/role/update-role-modal'
import { ViewRoleModal } from '@/ui/components/role/view-role-modal'
import { roleTagColors, roleCategoryLabels, permissionTagColors } from '@/ui/constants/tags'
import styles from './styles.module.css'

export const Roles: React.FC = () => {
	const { sharedData } = useProviders([sharedDataProvider])
	const roles = useRoles()

	const actionsRender = {
		title: 'Acciones',
		key: 'actions',
		dataIndex: 'id',
		width: 150,
		render: (_: any, role: IRoleWithPermissions) => (
			<Space size="small">
				<Button
					type="text"
					icon={<EyeOutlined />}
					onClick={() => roles.viewRolePopUp.open(role.id)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => roles.updateRolePopUp.open(role.id)}
					title="Editar"
				/>
				<Popconfirm
					open={roles.removeRolePopUp.isOpen(role.id)}
					title="Eliminar rol"
					description="¿Estás seguro de eliminar este rol?"
					okText="Sí"
					cancelText="No"
					placement="leftTop"
					onConfirm={() => roles.onRemoveRole(role.id)}
					onOpenChange={roles.removeRolePopUp.toggle(role.id)}
					okButtonProps={{ loading: roles.loadings.removeRole }}
					classNames={{ root: styles.pup_up_buttons }}
					cancelButtonProps={{ className: styles.popup_cancell_button }}
				>
					<Button type="text" title="Eliminar" icon={<DeleteOutlined />} danger />
				</Popconfirm>
			</Space>
		),
	}

	return (
		<>
			<PageHeader
				title="Administración de Roles"
				newItemText="Nuevo Rol"
				onNewItemClick={roles.createRoleToggle.open}
			/>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={roles.data}
				loading={roles.loadings.findAllRoles}
				pagination={{
					total: roles.pagination.total,
					current: roles.pagination.page,
					pageSize: roles.pagination.limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} roles`,
				}}
				onChange={(args) => roles.onPaginationChange(args)}
			/>

			<CreateRoleModal
				isOpen={roles.createRoleToggle.isOpen}
				isLoading={roles.loadings.createRole}
				title="Crear Nuevo Rol"
				permissions={sharedData.allPermissions.data}
				onCancel={roles.createRoleToggle.close}
				onSubmit={roles.onCreateRole}
			/>

			<ViewRoleModal
				openId={roles.viewRolePopUp.openId}
				roles={roles.data}
				onCancel={roles.viewRolePopUp.close}
			/>

			<UpdateRoleModal
				openId={roles.updateRolePopUp.openId}
				isLoading={roles.loadings.updateRole}
				roles={roles.data}
				permissions={sharedData.allPermissions.data}
				onCancel={roles.updateRolePopUp.close}
				onSubmit={roles.onUpdateRole}
			/>
		</>
	)
}

const tableColumns: ColumnsType<IRoleWithPermissions> = [
	{
		title: 'Nombre',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Permisos',
		render: (role: IRoleWithPermissions) => {
			const visiblePermissions = role.permissions.slice(0, 2)
			const remainingPermissionsCount = role.permissions.length - visiblePermissions.length

			return (
				<Space size={6} wrap>
					{visiblePermissions.map((permission) => (
						<Tag
							key={permission.id}
							color={permissionTagColors[permission.key.split(':')[1]] || 'default'}
						>
							{permission.name}
						</Tag>
					))}
					{remainingPermissionsCount > 0 && (
						<Tag color="grey">+{remainingPermissionsCount} más</Tag>
					)}
				</Space>
			)
		},
	},
	{
		title: 'Categoría',
		dataIndex: 'category',
		key: 'category',
		render: (category: IRoleCategory) => {
			return <Tag color={roleTagColors[category] || 'default'}>{roleCategoryLabels[category]}</Tag>
		},
	},
	{
		title: 'Fecha de creación',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (date: Date) => date.toLocaleDateString(),
	},
]
