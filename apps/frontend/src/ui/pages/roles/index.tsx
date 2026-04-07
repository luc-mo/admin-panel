import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useRoles } from './use-roles'
import type { IRoleWithPermissions, IRoleCategory } from '@princesitas/core'

import { PageHeader } from '@/ui/components/page-header'
import styles from './styles.module.css'

export const Roles: React.FC = () => {
	const { data, pagination, loadings, removeRolePopUp, onRemoveRole, onPaginationChange } =
		useRoles()

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
					onClick={() => console.log('Ver rol:', role)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => console.log('Editar rol:', role)}
					title="Editar"
				/>
				<Popconfirm
					open={removeRolePopUp.isOpen(role.id)}
					title="Eliminar rol"
					description="¿Estás seguro de eliminar este rol?"
					okText="Sí"
					cancelText="No"
					placement="leftTop"
					onConfirm={() => onRemoveRole(role.id)}
					onOpenChange={removeRolePopUp.toggle(role.id)}
					okButtonProps={{ loading: loadings.removeRole }}
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
				onNewItemClick={() => console.log('Crear nuevo rol')}
			/>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={data}
				loading={loadings.findAllRoles}
				pagination={{
					total: pagination.total,
					current: pagination.page,
					pageSize: pagination.limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} roles`,
				}}
				onChange={(args) => onPaginationChange(args)}
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
			const permissionColors: Record<string, string> = {
				create: 'green',
				list: 'blue',
				view: 'purple',
				update: 'orange',
				delete: 'red',
			}

			const visiblePermissions = role.permissions.slice(0, 2)
			const remainingPermissionsCount = role.permissions.length - visiblePermissions.length

			return (
				<Space size={6} wrap>
					{visiblePermissions.map((permission) => (
						<Tag
							key={permission.id}
							color={permissionColors[permission.key.split(':')[1]] || 'default'}
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
			const categoryColors: Record<IRoleCategory, string> = {
				ADMIN: 'blue',
				EDITOR: 'green',
				READER: 'geekblue',
				OTHER: 'default',
			}
			const categoryLabels: Record<IRoleCategory, string> = {
				ADMIN: 'Administrador',
				EDITOR: 'Editor',
				READER: 'Lector',
				OTHER: 'Otro',
			}
			return <Tag color={categoryColors[category] || 'default'}>{categoryLabels[category]}</Tag>
		},
	},
	{
		title: 'Fecha de creación',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (date: Date) => date.toLocaleDateString(),
	},
]
