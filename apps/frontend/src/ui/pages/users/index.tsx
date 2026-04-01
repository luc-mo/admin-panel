import { Table, Typography, Button, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useUsers } from './use-users'
import type { IUser } from '@princesitas/core'
import styles from './styles.module.css'

export const Users: React.FC = () => {
	const { users, limit, total, page, loading, onPaginationChange } = useUsers()

	const actionsRender = {
		title: 'Acciones',
		key: 'actions',
		dataIndex: 'id',
		width: 150,
		render: (_: any, record: IUser) => (
			<Space size="small">
				<Button
					type="text"
					icon={<EyeOutlined />}
					onClick={() => console.log('Ver usuario:', record)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => console.log('Editar usuario:', record)}
					title="Editar"
				/>
				<Popconfirm
					title="Eliminar usuario"
					description="¿Estás seguro de eliminar este usuario?"
					okText="Sí"
					cancelText="No"
					placement="leftTop"
					onConfirm={console.log}
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
					Administración de Usuarios
				</Typography.Title>
				<Button type="primary" icon={<PlusOutlined />}>
					Nuevo Usuario
				</Button>
			</div>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={users}
				loading={loading}
				pagination={{
					total,
					current: page,
					pageSize: limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} usuarios`,
				}}
				onChange={(args) => onPaginationChange(args)}
			/>
		</div>
	)
}

const tableColumns: ColumnsType<IUser> = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Nombre de usuario',
		dataIndex: 'username',
		key: 'username',
	},
	{
		title: 'Roles',
		render: (user: IUser) => (user.isSuperAdmin ? ['Super Admin'].concat(user.roles) : user.roles),
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
