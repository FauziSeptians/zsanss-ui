import Typography from "@/components/Typography";
import classNames from "@/utils/classNames";
import { LayoutTypes, ObjectSidebar } from "@/types/main";
import {
   ChevronDown,
   ChevronLeft,
   ChevronRight,
   ChevronUp,
} from "lucide-react";
import { useMemo, useState } from "react";

let COLOR = {
   MENU_HIGHLIGHT_COLOR: "",
   MENU_SELECTED_COLOR: "",
};

function MenuComponent(
   props: ObjectSidebar & {
      isMenuSelected?: boolean;
      children?: React.ReactNode;
      isMenuOpen?: boolean;
      onClick: () => void;
      isSidebarOpen?: boolean;
   }
) {
   const {
      icon: Icon,
      onClick,
      key,
      isMenuSelected,
      isMenuOpen,
      isSidebarOpen,
      subMenu,
      children,
      menu,
   } = props;

   return (
      <button
         className={classNames(
            isMenuOpen ? "bg-neutral-200/50" : "",
            "gap-0 w-full rounded-lg"
         )}
         onClick={onClick}
      >
         <div
            key={key}
            className={classNames(
               isMenuSelected
                  ? `border rounded-lg shadow-xs bg-[${COLOR.MENU_SELECTED_COLOR}]`
                  : "",
               isSidebarOpen ? "justify-between" : "justify-center",
               "p-3 cursor-pointer flex items-center hover:bg-slate-200"
            )}
         >
            <div className="flex items-center justify-center text-center gap-3">
               {Icon && <Icon className="!font-thin size-6" />}
               {isSidebarOpen ? (
                  <Typography.Text
                     bold
                     className={classNames(
                        "whitespace-nowrap transition-all duration-200",
                        isSidebarOpen
                           ? "opacity-100 translate-x-0 delay-150 visible"
                           : "opacity-0 translate-x-0 delay-0 invisible"
                     )}
                  >
                     {menu}
                  </Typography.Text>
               ) : null}
            </div>
            {subMenu && isSidebarOpen ? (
               isMenuOpen ? (
                  <ChevronUp className="cursor-pointer" />
               ) : (
                  <ChevronDown className="cursor-pointer" />
               )
            ) : null}
         </div>
         {subMenu && isMenuOpen && isSidebarOpen ? (
            <div className="flex flex-col">{children}</div>
         ) : null}
      </button>
   );
}

function SubMenuComponent(
   item: ObjectSidebar & {
      isMenuSelected?: boolean;
      children?: React.ReactNode;
      isSubmenuOpen?: boolean;
      onClick: () => void;
   }
) {
   const IconComponent = item.icon;

   return (
      <button className="w-full" onClick={item.onClick}>
         <div
            key={item?.key}
            className={classNames(
               item?.isMenuSelected
                  ? `border rounded-lg shadow-xs bg-[${COLOR.MENU_SELECTED_COLOR}]`
                  : "",
               "px-4 py-5 cursor-pointer flex justify-between items-center hover:bg-slate-200 border-b"
            )}
         >
            <div className="flex items-center gap-3">
               {IconComponent && (
                  <IconComponent className="!font-thin size-6" />
               )}
               <Typography.Text>{item?.menu}</Typography.Text>
            </div>
            {item?.subMenu ? <ChevronDown className="cursor-pointer" /> : null}
         </div>
         {item?.subMenu ? (
            <div className="px-4 py-2">{item?.children}</div>
         ) : null}
      </button>
   );
}

export default function Sidebar(props: LayoutTypes) {
   const {
      menus,
      urlPath: pathname,
      className,
      menuHiglightColor,
      menuSelectedColor,
   } = props;

   COLOR = {
      MENU_HIGHLIGHT_COLOR: menuHiglightColor ?? "#f5f5f5",
      MENU_SELECTED_COLOR: menuSelectedColor ?? "#ffffff",
   };

   const selectedMenuURL = useMemo(
      () =>
         menus?.find((menu) =>
            menu?.subMenu?.find((subMenu) => subMenu?.url === pathname)
         )?.url,
      [pathname, menus]
   );

   const [clickableMenu, setClickableMenu] = useState<{
      isOpen: boolean;
      url: string;
   }>({ isOpen: Boolean(selectedMenuURL), url: selectedMenuURL ?? pathname });

   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   function handlingRoutes({
      subMenu,
      menuURL,
   }: {
      subMenu: null | Array<ObjectSidebar> | undefined;
      menuURL: string;
   }) {
      const isSubMenuExists = Boolean(subMenu);

      if (!isSubMenuExists) return (window.location.href = menuURL);

      if (!isSidebarOpen) setIsSidebarOpen(true);

      setClickableMenu((prev) => ({
         isOpen: prev?.url === menuURL && prev.isOpen ? false : true,
         url: menuURL,
      }));
   }

   return (
      <div className="flex w-full">
         <aside
            className={classNames(
               isSidebarOpen ? "max-w-80" : "max-w-24",
               "relative w-full flex p-5 flex-col gap-10 justify-between group",
               "transition-all duration-300 ease-in-out",
               `bg-[${COLOR.MENU_HIGHLIGHT_COLOR}]`,
               className
            )}
         >
            <button
               className="z-50 absolute !bg-white p-2 rounded-full top-[50%] -right-5 cursor-pointer animate-pulse group-hover:flex hidden"
               onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
               {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
            <div id="top-sidebar" className="flex flex-col gap-10">
               <div
                  id="header-sidebar"
                  className={classNames(
                     isSidebarOpen ? "flex " : "hidden",
                     "w-full justify-between h-11 items-center"
                  )}
               >
                  {props?.headerComponent}
               </div>
               <div id="content-sidebar" className="flex flex-col gap-2">
                  {menus?.map((menu) => {
                     const isMenuOpen =
                        menu?.url === clickableMenu?.url &&
                        clickableMenu?.isOpen;

                     const isMenuSelected = menu?.url === pathname;

                     return (
                        <MenuComponent
                           icon={menu?.icon}
                           key={menu?.key}
                           menu={menu?.menu}
                           url={menu?.url}
                           subMenu={menu?.subMenu}
                           isMenuSelected={isMenuSelected}
                           isMenuOpen={isMenuOpen}
                           isSidebarOpen={isSidebarOpen}
                           onClick={() =>
                              handlingRoutes({
                                 subMenu: menu?.subMenu,
                                 menuURL: menu?.url,
                              })
                           }
                        >
                           {menu?.subMenu?.map((subMenu) => {
                              const isSubMenuSelected =
                                 subMenu?.url === pathname;

                              return (
                                 <SubMenuComponent
                                    icon={subMenu?.icon}
                                    key={subMenu?.key}
                                    menu={subMenu?.menu}
                                    url={subMenu?.url}
                                    subMenu={subMenu?.subMenu}
                                    isMenuSelected={isSubMenuSelected}
                                    isSubmenuOpen={false}
                                    onClick={() =>
                                       handlingRoutes({
                                          subMenu: subMenu?.subMenu,
                                          menuURL: subMenu?.url,
                                       })
                                    }
                                 />
                              );
                           })}
                        </MenuComponent>
                     );
                  })}
               </div>
            </div>
            <div id="bottom-sidebar">
               <div
                  className={classNames(
                     isSidebarOpen ? "flex " : "hidden",
                     "w-full justify-between h-11 items-center"
                  )}
               >
                  {props?.bottomComponent}
               </div>
            </div>
         </aside>
         <div className="w-full">{props?.children}</div>
      </div>
   );
}
