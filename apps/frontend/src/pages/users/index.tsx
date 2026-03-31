import { Table, Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useUsers } from '@/hooks/user/use-users'

export const Users = () => {
	const { users } = useUsers()

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
				columns={[]}
				dataSource={users.data}
				rowKey="id"
				pagination={{
					pageSize: 10,
					showSizeChanger: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} usuarios`,
				}}
			/>
		</div>
	)
}
