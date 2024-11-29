import { AppstoreOutlined, HomeOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import urls from './urls';

export const publicNav = [
    {
        label: 'Home',
        key: urls.home,
        icon: <HomeOutlined />,
    },
    {
        label: 'Register',
        key: urls.register,
        icon: <UserAddOutlined />,
    },
    {
        label: 'Login',
        key: urls.logIn,
        icon: <UserAddOutlined />,
    },
    {
        label: 'About us',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        key: 'alipay',
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
    },
];

export const userNav = [
    {
        label: 'Home',
        key: urls.home,
        icon: <HomeOutlined />,
    },
    {
        label: 'Log out',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
    },
    {
        label: 'About us',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        key: 'alipay',
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
    },
];

export const studentManageNav = [
    {
        label: 'Students Management',
        key: urls.studentsManagement,
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Courses Management',
        key: urls.coursesMaintenance,
        icon: <AppstoreOutlined />,
    },
];
