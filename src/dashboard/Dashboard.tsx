import { PageHeader, Button, Descriptions, Row, Statistic, Tag, Space } from 'antd'
import React from 'react'

import useTitle from '../page-header/title/useTitle'
import useTranslator from '../shared/hooks/useTranslator'

export const Dashboard: React.FC = () => {
  const { t } = useTranslator()
  useTitle(t('dashboard.label'))
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Christway Clinic"
        tags={<Tag color="blue">Running</Tag>}
        subTitle="44 Abimbola Felele, Ibadan"
        extra={[
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <Button>421421</Button>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
        <Row>
          <Space>
            <Statistic title="Price" prefix="$" value={568.08} />
            <Statistic title="Balance" prefix="$" value={3345.08} />
          </Space>
        </Row>
      </PageHeader>
      <br />
    </>
  )
}
