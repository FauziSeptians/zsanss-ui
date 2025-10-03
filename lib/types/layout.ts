import { LucideProps } from "lucide-react";

export type LayoutTypes = {
      children: React.ReactNode;
      menus: Array<ObjectSidebar>;
      urlPath: string;
      headerComponent?: React.ReactNode;
      bottomComponent?: React.ReactNode;
      className?: string;
      menuHiglightColor?: string;
      menuSelectedColor?: string;

}

export type ObjectSidebar = {
      icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
      key: string;
      menu: string;
      url: string;
      subMenu?: Array<ObjectSidebar>;
};