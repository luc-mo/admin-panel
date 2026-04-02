import { Table, Typography, Button, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useRoles } from './use-roles'
import type { IRole } from '@princesitas/core'
import styles from './styles.module.css'

export const Roles: React.FC = () => {
	const { data, pagination, loadings, removeRolePopUp, onRemoveRole, onPaginationChange } =
		useRoles()

	const actionsRender = {
		title: 'Acciones',
		key: 'actions',
		dataIndex: 'id',
		width: 150,
		render: (_: any, role: IRole) => (
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
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 16,
				}}
			>
				<Typography.Title level={3} style={{ margin: 0 }}>
					Administración de Roles
				</Typography.Title>
				<Button type="primary" icon={<PlusOutlined />}>
					Nuevo Rol
				</Button>
			</div>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={data}
				loading={loadings.findRoles}
				pagination={{
					total: pagination.total,
					current: pagination.page,
					pageSize: pagination.limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} roles`,
				}}
				onChange={(args) => onPaginationChange(args)}
			/>
		</div>
	)
}

const tableColumns: ColumnsType<IRole> = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Nombre',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Descripción',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Permisos',
		render: (user: IRole) => user.permissions.join(', '),
	},
	{
		title: 'Fecha de creación',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (date: Date) => date.toLocaleDateString(),
	},
	{
		title: 'Fecha de actualización',
		dataIndex: 'updatedAt',
		key: 'updatedAt',
		render: (date: Date) => date.toLocaleDateString(),
	},
]
