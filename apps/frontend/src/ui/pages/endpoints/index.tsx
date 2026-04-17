import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import { useEndpoints } from './use-endpoints'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'
import type { IEndpointWithRoles } from '@princesitas/core'

import { roleTagColors, permissionMethodTagColors } from '@/ui/constants/tags'

import { PageHeader } from '@/ui/components/page-header'
import { ViewEndpointModal } from '@/ui/components/endpoint/view-endpoint-modal'
import { CreateEndpointModal } from '@/ui/components/endpoint/create-endpoint-modal'
import { UpdateEndpointModal } from '@/ui/components/endpoint/update-endpoint-modal'
import styles from './styles.module.css'

export const Endpoints: React.FC = () => {
	const { sharedData } = useProviders([sharedDataProvider])
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
					onClick={() => endpoints.viewEndpointPopUp.open(endpoint.id)}
					title="Ver"
				/>
				<Button
					type="text"
					icon={<EditOutlined />}
					onClick={() => endpoints.updateEndpointToggle.open(endpoint.id)}
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
				onNewItemClick={endpoints.createEndpointToggle.open}
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

			<ViewEndpointModal
				openId={endpoints.viewEndpointPopUp.openId}
				endpoints={endpoints.data}
				onCancel={endpoints.viewEndpointPopUp.close}
			/>

			<CreateEndpointModal
				isOpen={endpoints.createEndpointToggle.isOpen}
				isLoading={endpoints.loadings.createEndpoint}
				title="Crear Nuevo Endpoint"
				roles={sharedData.allRoles.data}
				onCancel={endpoints.createEndpointToggle.close}
				onSubmit={endpoints.onCreateEndpoint}
			/>

			<UpdateEndpointModal
				openId={endpoints.updateEndpointToggle.openId}
				isLoading={endpoints.loadings.updateEndpoint}
				endpoints={endpoints.data}
				roles={sharedData.allRoles.data}
				onCancel={endpoints.updateEndpointToggle.close}
				onSubmit={endpoints.onUpdateEndpoint}
			/>
		</>
	)
}

const tableColumns: ColumnsType<IEndpointWithRoles> = [
	{
		title: 'Ruta',
		dataIndex: 'path',
		key: 'path',
		minWidth: 150,
	},
	{
		title: 'Método',
		dataIndex: 'method',
		key: 'method',
		render: (method: IEndpointWithRoles['method']) => (
			<Tag color={permissionMethodTagColors[method]}>{method}</Tag>
		),
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
