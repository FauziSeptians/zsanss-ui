import {
  Drawer as DrawerComponent,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./Drawer";

export type DrawerType = typeof DrawerComponent & {
  Portal: typeof DrawerPortal;
  Overlay: typeof DrawerOverlay;
  Trigger: typeof DrawerTrigger;
  Close: typeof DrawerClose;
  Content: typeof DrawerContent;
  Header: typeof DrawerHeader;
  Footer: typeof DrawerFooter;
  Title: typeof DrawerTitle;
  Description: typeof DrawerDescription;
};

const Drawer = DrawerComponent as DrawerType;
Drawer.Portal = DrawerPortal;
Drawer.Overlay = DrawerOverlay;
Drawer.Trigger = DrawerTrigger;
Drawer.Close = DrawerClose;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;

export default Drawer;
export {
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
