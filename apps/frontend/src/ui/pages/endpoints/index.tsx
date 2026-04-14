import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useEndpoints } from './use-endpoints'
import type { IEndpointWithRoles } from '@princesitas/core'

import { roleTagColors } from '@/ui/constants/tags'

import { PageHeader } from '@/ui/components/page-header'
import styles from './styles.module.css'

export const Endpoints: React.FC = () => {
	const endpoints = useEndpoints()

	const actionsRender = {
		title: 'Acciones',
		key: 'actions',
		dataIndex: 'id',
		width: 150,
		render: (_: any, endpoint: IEndpointWithRoles) => (
			<Space size="small">
				<Button
					type="text"
					icon={<EyeOutlined />}
					onClick={() => console.log(endpoint.id)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => console.log(endpoint.id)}
					title="Editar"
				/>
				<Popconfirm
					open={endpoints.removeEndpointPopUp.isOpen(endpoint.id)}
					placement="leftTop"
					title="Eliminar endpoint"
					description="¿Estás seguro de eliminar este endpoint?"
					okText="Sí"
					cancelText="No"
					classNames={{ root: styles.pup_up_buttons }}
					okButtonProps={{ loading: endpoints.loadings.removeEndpoint }}
					cancelButtonProps={{
						className: styles.popup_cancell_button,
						disabled: endpoints.loadings.removeEndpoint,
					}}
					onConfirm={() => endpoints.onRemoveEndpoint(endpoint.id)}
					onOpenChange={(isOpen) => {
						if (!isOpen && endpoints.loadings.removeEndpoint) return
						endpoints.removeEndpointPopUp.toggle(endpoint.id)(isOpen)
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
				title="Administración de Endpoints"
				newItemText="Nuevo Endpoint"
				onNewItemClick={() => {}}
			/>

			<Table
				className={styles.table}
				rowKey="id"
				columns={[...tableColumns, actionsRender]}
				dataSource={endpoints.data}
				loading={endpoints.loadings.findEndpoints}
				pagination={{
					total: endpoints.pagination.total,
					current: endpoints.pagination.page,
					pageSize: endpoints.pagination.limit,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} endpoints`,
				}}
				onChange={(args) => endpoints.onPaginationChange(args)}
			/>
		</>
	)
}

const tableColumns: ColumnsType<IEndpointWithRoles> = [
	{
		title: 'Ruta',
		dataIndex: 'path',
		key: 'path',
		minWidth: 200,
	},
	{
		title: 'Roles',
		render: (endpoint: IEndpointWithRoles) => {
			const visibleRoles = endpoint.roles.slice(0, 2)
			const remainingRolesCount = endpoint.roles.length - visibleRoles.length
			return (
				<Space size={6} wrap>
					{visibleRoles.map((role) => (
						<Tag key={role.id} color={roleTagColors[role.category] || 'default'}>
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
