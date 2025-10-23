import Sidebar from './Sidebar';

/**
 * Props for the `Layout` component.
 */
type layoutProps = {
  /**
   * Content to be rendered inside the layout container.
   */
  children: React.ReactNode;
};

/**
 * `Layout` is a structural wrapper component used to define the main content area of a page or section.
 * It renders its children inside a semantic `<section>` tag and can be extended with layout-specific components.
 *
 * This component exposes a subcomponent:
 * - `Layout.Sidebar`: used to render a sidebar alongside the main layout.
 *
 * @component
 * @example
 * ```tsx
 * <Layout>
 *   <Layout.Sidebar />
 *   <main>Main content here</main>
 * </Layout>
 * ```
 *
 * @param props - Props containing `children` to be rendered inside the layout.
 * @returns A semantic `<section>` element wrapping the provided content.
 */
function LayoutComponent(props: layoutProps) {
  return <section>{props?.children}</section>;
}

/**
 * Extended `Layout` component with attached subcomponent:
 * - `Layout.Sidebar`: renders a sidebar element.
 */
type LayoutType = typeof LayoutComponent & {
  Sidebar: typeof Sidebar;
};

const Layout = LayoutComponent as LayoutType;
Layout.Sidebar = Sidebar;

export default Layout;
export { Sidebar };
