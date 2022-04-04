import { useState } from "react"

import { Tooltip, Layout, Menu, Button } from "antd"
import {
  BarChartOutlined,
  RiseOutlined,
  SlidersOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LogoutOutlined,
  AntCloudOutlined,
  DashboardOutlined,
  BankOutlined
} from "@ant-design/icons"


import theme from "styles/Theme"

import Heading from "components/Heading"

import styled from "styled-components"
import { useSelector } from "react-redux"
import { getGoBack, getPageTitle } from "redux/app"
import { getUserData } from "redux/user"

import FullScreenLoader from "./FullScreenLoader"

import { CallLogout } from "api/auth/logout"

import { useHistory } from "react-router-dom"

const { Header, Content, Sider } = Layout

export default function CustomLayout({ children }) {
  const pageTitle = useSelector(getPageTitle)
  const goBack = useSelector(getGoBack)
  const user = useSelector(getUserData)
  

  const [logoutLoading, setLogoutLoading] = useState(false)

  const [collapsed, setCollapsed] = useState(false)

  const { push: redirectTo, goBack: goBackHistory } = useHistory()

  const onLogout = async () => {
    // setLogoutLoading(true)
    // const res = await CallLogout()
    // setLogoutLoading(false)
    redirectTo("/auth/login")
  }
    return (
      <LayoutWrapper>
        <Layout
          style={{
            background: theme.colors.background,
            height: "100%",
          }}>
          <Sider
            collapsible
            width={230}
            collapsed={collapsed}
            onCollapse={c => setCollapsed(c)}
            className='custom-sider'
            theme='light'
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}>
            <Profile collapsed={collapsed}>
              <Avatar collapsed={collapsed}>
                <UserOutlined />
              </Avatar>
              <Info collapsed={collapsed}>
                <h2>{'Amjad'}</h2>
                <p>Admin</p>
              </Info>
            </Profile>
            <Menu
              // theme='dark'
              mode='inline'
              defaultSelectedKeys={["1"]}
              theme='light'
              style={{
                border: "none",
                overflowX: "hidden",
                userSelect: "none",
              }}>
              <Menu.Item
                onClick={() => redirectTo("/dashboard")}
                key='0'
                icon={<DashboardOutlined />}>
                Dashboard
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className='site-layout'
            style={{
              transition: "0.15s ease all",
              marginLeft: collapsed ? 79 : 230,
              height: "100%",
              background: theme.colors.background,
            }}>
            <Header
              style={{
                padding: 0,
                background: theme.colors.background,
              }}>
              <HeaderWrapper>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    userSelect: "none",
                  }}>
                  {goBack && (
                    <Tooltip title='Go Back'>
                      <div
                        onClick={goBack === "history" ? goBackHistory : goBack}
                        style={{
                          cursor: "pointer",
                        }}>
                        <ArrowLeftOutlined
                          style={{
                            fontSize: "22px",
                            transform: "translateY(4px)",
                          }}
                        />
                      </div>
                    </Tooltip>
                  )}
                  <Heading
                    style={{
                      transition: "all .15s ease",
                      marginLeft: goBack ? "50px" : "0px",
                    }}
                    size='26px'>
                    {pageTitle}
                  </Heading>
                </div>
                <MenuItems>
                  <Button
                    type='secondary'
                    size='large'
                    icon={<LogoutOutlined />}
                    onClick={onLogout}
                    loading={logoutLoading}>
                    Logout
                  </Button>
                </MenuItems>
              </HeaderWrapper>
            </Header>
            <Content
              style={{
                padding: "30px",
                marginTop: "10px",
                overflow: "initial",
                height: "100%",
                background: theme.colors.background,
              }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </LayoutWrapper>
    )
}

const LayoutWrapper = styled.div`
  height: 100%;
  .custom-sider {
    border-right: 1px solid ${p => p.theme.colors.border} !important;
  }
  .ant-menu-title-content {
    font-size: 16px !important;
    font-weight: 500 !important;
    margin-left: 4px !important;
  }

  .ant-menu-item > .anticon {
    font-size: 20px !important;
    margin-right: 10px;
  }

  .ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
    & > .anticon {
      transform: translateY(6px) translateX(-2px);
    }
  }

  .ant-layout-sider-trigger {
    background: ${p => p.theme.colors.border};
  }

  .ant-menu-item {
    margin-bottom: 0px;
    height: 50px;

    &::after {
      border-right-width: 4px;
    }
  }

  .ant-input-prefix {
    margin-right: 10px;
  }
`

const HeaderWrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 3px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`
const MenuItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? "center" : "flex-start")};
  transition: all 0.15s all;
  padding: ${({ collapsed }) => (collapsed ? "0px" : "0px 5px 0px 24px")};
  height: 73px;
  position: relative;
  margin-bottom: 24px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
`

const Avatar = styled.div`
  ${({ collapsed }) =>
    collapsed ? "width: 43px;height: 43px;" : "width: 48px;height: 48px;"}
  background: ${p => p.theme.colors.gray7};
  border-radius: 50%;
  transition: all 0.15s ease;
  margin-right: ${({ collapsed }) => (collapsed ? "0px" : "12px")};
  display: flex;
  align-items: center;
  justify-content: center;

  .anticon {
    color: ${p => p.theme.colors.black};
    font-size: 19px;
  }
`

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  display: ${({ collapsed }) => (collapsed ? "none" : "block")};
  h2,
  p {
    margin: 0;
    padding: 0;
  }
  h2 {
    text-transform: capitalize;
    font-size: 15px;
    font-weight: ${p => p.theme.font.weight.semiBold};
    color: ${p => p.theme.colors.black};
  }
  p {
    color: ${p => p.theme.colors.gray8};
    font-size: 13px;
    margin-top: -2px;
  }
`
