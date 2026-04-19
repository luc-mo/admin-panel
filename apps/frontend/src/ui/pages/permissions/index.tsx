import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { usePermissions } from './use-permissions'
import type { IPermission } from '@princesitas/core'

import { AccessGuard } from '@/ui/guards/access-guard'
import { NotFound } from '@/ui/layouts/not-found'
import { PageHeader } from '@/ui/components/page-header'
import { CreatePermissionModal } from '@/ui/components/permission/create-permission-modal'
import { UpdatePermissionModal } from '@/ui/components/permission/update-permission-modal'
import { ViewPermissionModal } from '@/ui/components/permission/view-permission-modal'
import { permissionsPagePermissions } from '@/ui/constants/page-permissions'
import { permissionTagColors } from '@/ui/constants/tags'
import styles from './styles.module.css'

export const Permissions: React.FC = AccessGuard.withAccess({
	permissions: permissionsPagePermissions,
	Fallback: NotFound,
	Component: () => {
		const permissions = usePermissions()

		const actionsRender = {
			title: 'Acciones',
			key: 'actions',
			dataIndex: 'id',
			align: 'center' as const,
			width: 150,
			render: (_: any, permission: IPermission) => (
				<Space size="small">
					<AccessGuard permissions={['permission:view']}>
						<Button
							type="text"
							icon={<EyeOutlined />}
							onClick={() => permissions.viewPermissionPopUp.open(permission.id)}
							title="Ver"
						/>
					</AccessGuard>
					<AccessGuard permissions={['permission:update']}>
						<Button
							type="text"
							icon={<EditOutlined />}
							onClick={() => permissions.updatePermissionPopUp.open(permission.id)}
							title="Editar"
						/>
					</AccessGuard>
					<AccessGuard permissions={['permission:delete']}>
						<Popconfirm
							open={permissions.removePermissionPopUp.isOpen(permission.id)}
							title="Eliminar permiso"
							description="¿Estás seguro de eliminar este permiso?"
							okText="Sí"
							cancelText="No"
							placement="leftTop"
							onConfirm={() => permissions.onRemovePermission(permission.id)}
							onOpenChange={permissions.removePermissionPopUp.toggle(permission.id)}
							okButtonProps={{ loading: permissions.loadings.removePermission }}
							classNames={{ root: styles.pup_up_buttons }}
							cancelButtonProps={{ className: styles.popup_cancell_button }}
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
					title="Administración de Permisos"
					newItemText="Nuevo Permiso"
					onNewItemClick={permissions.createPermissionToggle.open}
				/>

				<Table
					className={styles.table}
					rowKey="id"
					columns={[...tableColumns, actionsRender]}
					dataSource={permissions.data}
					loading={permissions.loadings.findAllPermissions}
					pagination={{
						total: permissions.pagination.total,
						current: permissions.pagination.page,
						pageSize: permissions.pagination.limit,
						showSizeChanger: true,
						showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} permisos`,
					}}
					onChange={(args) => permissions.onPaginationChange(args)}
				/>

				<CreatePermissionModal
					isOpen={permissions.createPermissionToggle.isOpen}
					isLoading={permissions.loadings.createPermission}
					title="Crear Nuevo Permiso"
					onCancel={permissions.createPermissionToggle.close}
					onSubmit={permissions.onCreatePermission}
				/>

				<ViewPermissionModal
					openId={permissions.viewPermissionPopUp.openId}
					permissions={permissions.data}
					onCancel={permissions.viewPermissionPopUp.close}
				/>

				<UpdatePermissionModal
					openId={permissions.updatePermissionPopUp.openId}
					isLoading={permissions.loadings.updatePermission}
					permissions={permissions.data}
					onCancel={permissions.updatePermissionPopUp.close}
					onSubmit={permissions.onUpdatePermission}
				/>
			</>
		)
	},
})

const tableColumns: ColumnsType<IPermission> = [
	{
		title: 'Nombre',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Clave',
		dataIndex: 'key',
		key: 'key',
		render: (key: string) => {
			const action = key.split(':')[1]
			return <Tag color={permissionTagColors[action] || 'default'}>{key}</Tag>
		},
	},
	{
		title: 'Fecha de creación',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (date: Date) => date.toLocaleDateString(),
	},
]
