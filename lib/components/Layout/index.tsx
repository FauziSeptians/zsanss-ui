import Sidebar from "./Sidebar";

type layoutProps = {
   children: React.ReactNode;
};

function LayoutComponent(props: layoutProps) {
   return <section>{props?.children}</section>;
}

type LayoutType = typeof LayoutComponent & {
   Sidebar: typeof Sidebar;
};

const Layout = LayoutComponent as LayoutType;
Layout.Sidebar = Sidebar;

export default Layout;
export { Sidebar };
